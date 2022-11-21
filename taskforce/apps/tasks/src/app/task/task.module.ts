import { Module } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { TaskMemoryRepository } from './repository/task-memory.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [CommentService],
  controllers: [TaskController],
  providers: [TaskMemoryRepository, TaskService]
})
export class TaskModule {}
