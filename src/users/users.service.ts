import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

const looger = new Logger('users service');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    looger.debug('getAllUsers start');
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    looger.debug('getUserById ', id);
    return this.usersRepository.findOne({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    looger.debug('createUserDto', CreateUserDto);
    const { email, password, nickname } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt); // password hash 값으로 변환
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      nickname,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing email');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }
}
