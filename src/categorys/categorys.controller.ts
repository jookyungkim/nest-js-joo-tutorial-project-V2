import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
const logger = new Logger('categoryController');

@Controller('categorys')
export class CategorysController {
  constructor(private categorysService: CategorysService) {}

  @Get()
  getAllCategorys(): Promise<Category[]> {
    logger.debug('getAllCategorys start');
    return this.categorysService.getAllCategroys();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<void> {
    logger.debug('createCategory start');
    return this.categorysService.createCategory(createCategoryDto);
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    logger.debug('getCategoryById start');
    return this.categorysService.getCategoryById(id);
  }
}
