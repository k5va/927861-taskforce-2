import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseModule } from './response/response.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TaskModule,
    CommentModule,
    CategoryModule,
    ResponseModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
