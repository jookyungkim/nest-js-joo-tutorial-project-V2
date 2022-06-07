import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const looger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  looger.log(`Application running on port ${port}`);
  await app.listen(port);
}
bootstrap();
