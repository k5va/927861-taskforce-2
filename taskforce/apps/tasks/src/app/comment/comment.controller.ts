import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('tasks')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('task/:id/comment')
  async create(@Param('id') taskId: string, @Body() dto: CreateCommentDto) {
    const userId = '';
    const newComment = await this.commentService.create(userId, taskId, dto);
    return fillObject(CommentRdo, newComment);
  }

  @Delete('task/:taskId/comment/:commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId);
  }
}
