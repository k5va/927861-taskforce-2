import { Module } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [CommentModule],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService],
})
export class TaskModule {}
