import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { ResponseRepository } from './repository/response.repository';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [ResponseController],
  providers: [ResponseRepository, ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {}
