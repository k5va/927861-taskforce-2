import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskUserModule } from './task-user/task-user.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.const';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig],
    }),
    AuthModule,
    TaskUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
