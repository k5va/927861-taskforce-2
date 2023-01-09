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
  Headers,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  CommentRdo,
  parseQueryFromUrl,
} from '@taskforce/core';

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
  async create(
    @Param('id') taskId: string,
    @Body() dto: CreateCommentDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.commentService.create(taskId, dto, authHeader);
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
  async deleteComment(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
    @Headers('authorization') authHeader: string
  ) {
    return this.commentService.deleteComment(taskId, commentId, authHeader);
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
  async showByTask(@Param('id') taskId: string, @Req() req: Request) {
    const query = parseQueryFromUrl(req.url);

    return this.commentService.findByTask(taskId, query);
  }
}
