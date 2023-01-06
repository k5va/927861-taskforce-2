import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  fillObject,
  GetUser,
  JwtAuthGuard,
  Roles,
  RolesGuard,
} from '@taskforce/core';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';
import { UserRoles } from '@taskforce/shared-types';

@ApiTags('tasks')
@Controller('tasks')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('task/:id/review')
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'Review was successfully created',
  })
  @Roles(UserRoles.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(
    @GetUser('id') userId: string,
    @Param('id') taskId: number,
    @Body() dto: CreateReviewDto
  ) {
    const newReview = await this.reviewService.create(taskId, dto, userId);
    return fillObject(ReviewRdo, newReview);
  }
}
