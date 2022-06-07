export class tokenUserDataDto {
  email: string;
  nickname: string;
  access_token: string;

  constructor(email, nickname, access_token) {
    this.email = email;
    this.nickname = nickname;
    this.access_token = access_token;
  }
}
