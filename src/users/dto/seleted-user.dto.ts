import { IsString } from 'class-validator';

export class SeletedUserDto {
  @IsString()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}
