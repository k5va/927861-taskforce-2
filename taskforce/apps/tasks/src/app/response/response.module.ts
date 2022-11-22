import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseMemoryRepository } from './repository/response-memory.repository';

@Module({
  providers: [ResponseMemoryRepository, ResponseService],
  exports: [ResponseService],
})
export class CommentModule {}
