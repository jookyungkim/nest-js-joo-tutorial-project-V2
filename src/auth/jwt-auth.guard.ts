import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const logger = new Logger('jwtAuthGuard');

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  // login한 고객정보 검증
  handleRequest(err, user) {
    // logger.debug('handleRequest user : ', user);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
