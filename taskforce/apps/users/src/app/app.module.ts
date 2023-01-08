import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskUserModule } from './task-user/task-user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.const';
import { envSchema } from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { rtConfig } from '../config';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  getServeStaticOptions,
  staticConfig,
  rabbitMqConfig,
  mongoDbConfig,
  getMongoDbOptions,
  jwtConfig,
} from '@taskforce/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongoDbConfig, jwtConfig, rtConfig, rabbitMqConfig, staticConfig],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(getMongoDbOptions()),
    AuthModule,
    TaskUserModule,
    ServeStaticModule.forRootAsync({
      useFactory: getServeStaticOptions,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
