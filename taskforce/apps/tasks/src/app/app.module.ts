import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.const';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { envSchema } from './env.schema';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseModule } from './response/response.module';
import { ReviewModule } from './review/review.module';
import { TaskContractorModule } from './task-contractor/task-contractor.module';
import { TaskModule } from './task/task.module';
import {
  getServeStaticOptions,
  staticConfig,
  rabbitMqConfig,
  getJwtOptions,
  jwtConfig,
} from '@taskforce/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@taskforce/core';
import { TaskStatusModule } from './task-status/task-status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqConfig, staticConfig, jwtConfig],
      validationSchema: envSchema,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: getServeStaticOptions,
      inject: [ConfigService],
    }),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: getJwtOptions,
      inject: [ConfigService],
    }),
    TaskModule,
    CommentModule,
    CategoryModule,
    ResponseModule,
    ReviewModule,
    TaskContractorModule,
    TaskStatusModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
