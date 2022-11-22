import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseMemoryRepository } from './repository/response-memory.repository';
import { ResponseController } from './response.controller';

@Module({
  controllers: [ResponseController],
  providers: [ResponseMemoryRepository, ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {}
