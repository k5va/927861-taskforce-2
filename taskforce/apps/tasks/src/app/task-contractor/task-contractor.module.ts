import { Module } from '@nestjs/common';
import { TaskContractorService } from './task-contractor.service';
import { TaskContractorController } from './task-contractor.controller';
import { TaskContractorRepository } from './repository/task-contractor.repository';

@Module({
  controllers: [TaskContractorController],
  providers: [TaskContractorRepository, TaskContractorService],
  exports: [TaskContractorService],
})
export class TaskContractorModule {}
