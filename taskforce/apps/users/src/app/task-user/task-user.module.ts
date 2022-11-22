import { Module } from '@nestjs/common';
import { TaskUserMemoryRepository } from './repository/task-user-memory.repository';

@Module({
  providers: [TaskUserMemoryRepository],
  exports: [TaskUserMemoryRepository]
})
export class TaskUserModule {}
