import {
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
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
  @ApiOperation({ summary: 'Creates new comment' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    type: CommentRdo,
    description: 'Comment was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
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
  @ApiOperation({ summary: 'Deletes comment' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiNoContentResponse({
    description: 'Comment was successfully deleted',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @GetUser('id') userId: string,
    @Param('commentId') commentId: number
  ) {
    return this.commentService.deleteComment(userId, commentId);
  }

  @Get('task/:id/comment')
  @ApiOperation({ summary: 'Gets tasks comments' })
  @ApiOkResponse({
    type: CommentRdo,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  async showByTask(@Param('id') taskId: number, @Query() query: CommentQuery) {
    return fillObject(
      CommentRdo,
      await this.commentService.findByTask(taskId, query)
    );
  }
}
