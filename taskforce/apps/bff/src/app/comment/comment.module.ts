import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [HttpModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
