import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentizls.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { tokenUserDataDto } from 'src/users/dto/token-user-data.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<tokenUserDataDto> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const access_token = this.jwtService.sign(payload);
      const tokenUser = new tokenUserDataDto(
        email,
        user.nickname,
        access_token,
      );
      return tokenUser;
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
