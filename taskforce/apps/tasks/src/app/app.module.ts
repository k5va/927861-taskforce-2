import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { rabbitMqConfig } from '../config/rabbitmq.config';
import { ENV_FILE_PATH } from './app.const';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { envSchema } from './env.schema';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseModule } from './response/response.module';
import { ReviewModule } from './review/review.module';
import { TaskContractorModule } from './task-contractor/task-contractor.module';
import { TaskModule } from './task/task.module';
import { getServeStaticOptions, staticConfig } from '@taskforce/config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqConfig, staticConfig],
      validationSchema: envSchema,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: getServeStaticOptions,
      inject: [ConfigService],
    }),
    TaskModule,
    CommentModule,
    CategoryModule,
    ResponseModule,
    ReviewModule,
    TaskContractorModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
