import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentMemoryRepository } from './repository/comment-memory.repository';

@Module({
  providers: [CommentMemoryRepository, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
