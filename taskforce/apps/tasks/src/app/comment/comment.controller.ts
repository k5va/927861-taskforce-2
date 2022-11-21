import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponse } from './response/comment.response';

@Controller('tasks')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('task/:id/comment')
  async create(@Param() taskId: string, @Body() dto: CreateCommentDto) {
    const userId = '';
    const newComment = await this.commentService.create(userId, taskId, dto);
    return fillObject(CommentResponse, newComment);
  }

  @Delete('task/:taskId/comment/:commentId')
  async deleteComment(@Param() commentId: string) {
    return this.commentService.deleteComment(commentId);
  }
}
