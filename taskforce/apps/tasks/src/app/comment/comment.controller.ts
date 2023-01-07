import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { fillObject, GetUser, JwtAuthGuard } from '@taskforce/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentQuery } from './query';

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
  @UseGuards(JwtAuthGuard)
  async create(
    @GetUser('id') userId: string,
    @Param('id') taskId: number,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.commentService.create(userId, taskId, dto);
    return fillObject(CommentRdo, newComment);
  }

  @Delete('task/:taskId/comment/:commentId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment was successfully deleted',
  })
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @GetUser('id') userId: string,
    @Param('commentId') commentId: number
  ) {
    return this.commentService.deleteComment(userId, commentId);
  }

  @Get('task/:id/comment')
  @ApiResponse({
    type: CommentRdo,
    isArray: true,
    status: HttpStatus.OK,
  })
  async showByTask(@Param('id') taskId: number, @Query() query: CommentQuery) {
    return fillObject(
      CommentRdo,
      await this.commentService.findByTask(taskId, query)
    );
  }
}
