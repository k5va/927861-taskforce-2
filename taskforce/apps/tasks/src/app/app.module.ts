import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqConfig],
      validationSchema: envSchema,
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
