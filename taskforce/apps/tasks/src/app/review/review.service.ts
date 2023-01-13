import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Review, TaskStatuses } from '@taskforce/shared-types';
import { TaskService } from '../task/task.service';
import { CreateReviewDto } from '@taskforce/core';
import { ReviewRepository } from './repository/review.repository';
import { ReviewError } from './review.const';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly taskService: TaskService
  ) {}

  public async create(
    taskId: number,
    dto: CreateReviewDto,
    customer: string
  ): Promise<Review> {
    const task = await this.taskService.getTask(taskId);

    if (task.customer !== customer) {
      throw new UnauthorizedException(ReviewError.CustomerMismatch);
    }

    if (task.contractor !== dto.contractor) {
      throw new BadRequestException(ReviewError.ContractorMismatch);
    }

    if (task.status !== TaskStatuses.Done) {
      throw new BadRequestException(ReviewError.TaskStatusNotDone);
    }

    // check if review was created earlier
    const existingReview = await this.reviewRepository.findByCustomerAndTask(
      customer,
      taskId
    );
    if (existingReview.length > 0) {
      throw new ConflictException(ReviewError.AlreadyExists);
    }

    const newReview = await this.reviewRepository.create(
      new ReviewEntity({
        ...dto,
        taskId,
        customer,
      })
    );

    return newReview;
  }
}
