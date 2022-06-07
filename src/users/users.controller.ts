import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { SeletedUserDto } from './dto/seleted-user.dto';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentizls.dto';
import { AuthService } from 'src/auth/auth.service';
import { ClientUserDataDto } from './dto/client-user-data.dto';
import { tokenUserDataDto } from './dto/token-user-data.dto';

const logger = new Logger('users controller');

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService, // private authService: AuthService,
    private authService: AuthService,
  ) {}

  @Get('/')
  getAllUser(): Promise<User[]> {
    logger.debug('getAllUser start');
    return this.usersService.getAllUsers();
  }

  @Post('/')
  createUser(@Body(ValidationPipe) createUser: CreateUserDto): Promise<User> {
    logger.debug('createUser start');
    return this.usersService.createUser(createUser);
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response,
  ): Promise<ClientUserDataDto> {
    logger.debug('login start');
    const tokenUser: tokenUserDataDto = await this.authService.login(
      authCredentialsDto,
    );
    await response.cookie('Authorization', tokenUser.access_token);
    return new ClientUserDataDto(tokenUser.email, tokenUser.nickname);
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res): Promise<string> {
    logger.debug('logout start');
    res.cookie('Authorization', '');
    return 'ok';
  }

  @UseGuards(jwtAuthGuard)
  @Get('/profile/1')
  async getProfile(@Request() req): Promise<ClientUserDataDto> {
    logger.debug('profile');
    return new ClientUserDataDto(req.user.email, req.user.nickname);
  }
}
