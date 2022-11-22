import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentMemoryRepository } from './repository/comment-memory.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentMemoryRepository, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
