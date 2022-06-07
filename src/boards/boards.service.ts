import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { User } from '../users/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';

const logger = new Logger('boards service');

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    logger.debug('getAllBoards');
    return this.boardsRepository
      .createQueryBuilder('board')
      .innerJoinAndSelect('board.user', 'user')
      .getMany();
  }

  async getBoardById(id: number): Promise<Board> {
    logger.debug('getBoardById ', id);
    return this.boardsRepository.findOne({ id });
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    logger.debug('createBoard ', createBoardDto);
    const { title, content } = createBoardDto;
    const board = this.boardsRepository.create({
      title,
      content,
      user,
    });

    try {
      this.boardsRepository.save(board);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return board;
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    user: User,
  ): Promise<Board> {
    logger.debug('updateBoard id', id);
    logger.debug('updateBoard dto', updateBoardDto);
    const board = await this.getBoardById(id);

    board.title = updateBoardDto.title;
    board.content = updateBoardDto.content;
    board.user = user;

    await this.boardsRepository.save(board);
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    logger.debug('deleteBoard id', id);
    const post = await this.boardsRepository.delete({ id, user });
    if (post.affected === 0) {
      throw new NotFoundException(`Can' find Board with id ${id}`);
    }
  }
}
