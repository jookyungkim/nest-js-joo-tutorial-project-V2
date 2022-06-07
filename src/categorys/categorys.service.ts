import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

const logger = new Logger('BoardsService');

@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(Category)
    private categorysRepository: Repository<Category>,
  ) {}

  async getCategoryById(id: number): Promise<Category> {
    const found = await this.categorysRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Category with id ${id}`);
    }

    return found;
  }

  async createCategory(cateCategoryDto: CreateCategoryDto): Promise<void> {
    logger.debug('createCategory');
    const { text, parentId } = cateCategoryDto;
    const category = await this.categorysRepository.findOne({
      where: { id: parentId },
    });

    const createCategory = await this.categorysRepository.create({
      text,
    });

    createCategory.parentCategory = category;

    try {
      await this.categorysRepository.save(createCategory);
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('category insert error');
    }
  }

  async getAllCategroys(): Promise<Category[]> {
    return this.categorysRepository
      .createQueryBuilder('category')
      .andWhere('category.parentCategoryId is null')
      .leftJoinAndSelect('category.childCategories', 'product')
      .getMany();
  }
}
