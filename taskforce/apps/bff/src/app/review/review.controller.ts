import {
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Body, Controller, Param, Post, Headers } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, ReviewRdo } from '@taskforce/core';

@ApiTags('tasks')
@Controller('tasks')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('task/:id/review')
  @ApiOperation({ summary: 'Creates new task review' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    type: ReviewRdo,
    description: 'Review was successfully created',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async create(
    @Param('id') taskId: string,
    @Body() dto: CreateReviewDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.reviewService.create(taskId, dto, authHeader);
  }
}
