import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('tasks')
@Controller('tasks')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('task/:id/comment')
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment was successfully created',
  })
  async create(@Param('id') taskId: string, @Body() dto: CreateCommentDto) {
    const userId = '123'; // TODO: temporary
    const newComment = await this.commentService.create(
      userId,
      Number.parseInt(taskId, 10),
      dto
    );
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment was successfully deleted',
  })
  @Delete('task/:taskId/comment/:commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(Number.parseInt(commentId, 10));
  }
}
