import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';

import { User } from 'src/users/user.entity';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateBoardDto } from './dto/update-board.dto';
import { GetUser } from 'src/users/get-user.decorator';

const logger = new Logger('BoardsController');

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Promise<Board[]> {
    logger.debug('getAllPost');
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    logger.debug('getPostById id', id);
    return this.boardsService.getBoardById(id);
  }

  @UseGuards(jwtAuthGuard)
  @Post()
  createBoard(
    @Body(ValidationPipe) createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    logger.debug('createPost createBoardDto', createBoardDto);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @UseGuards(jwtAuthGuard)
  @Patch('/:id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBoardDto: UpdateBoardDto,
    @GetUser() user: User,
  ) {
    logger.debug('updateBoard id', id);
    logger.debug('updateBoard updateBoardDto', updateBoardDto);
    return this.boardsService.updateBoard(id, updateBoardDto, user);
  }

  @UseGuards(jwtAuthGuard)
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    logger.debug('deleteBoard id', id);
    return this.boardsService.deleteBoard(id, user);
  }
}
