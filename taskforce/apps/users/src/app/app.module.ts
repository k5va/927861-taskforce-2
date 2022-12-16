import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskUserModule } from './task-user/task-user.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.const';
import envSchema from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig, getMongoConfig, jwtConfig, rtConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtConfig, rtConfig],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    AuthModule,
    TaskUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
