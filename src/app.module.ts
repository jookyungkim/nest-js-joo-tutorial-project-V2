import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { CategorysModule } from './categorys/categorys.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UsersModule, AuthModule, BoardsModule, CategorysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
