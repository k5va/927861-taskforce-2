import { Module } from '@nestjs/common';
import { TaskCustomerService } from './task-customer.service';
import { TaskContractorController } from './task-customer.controller';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [TaskContractorController],
  providers: [TaskCustomerService],
  exports: [TaskCustomerService],
})
export class TaskCustomerModule {}
