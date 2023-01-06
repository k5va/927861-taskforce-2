import { Module } from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { TaskStatusController } from './task-status.controller';
import { TaskModule } from '../task/task.module';
import { ResponseModule } from '../response/response.module';

@Module({
  imports: [TaskModule, ResponseModule],
  controllers: [TaskStatusController],
  providers: [TaskStatusService],
})
export class TaskStatusModule {}
