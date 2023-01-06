import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Review, TaskStatuses } from '@taskforce/shared-types';
import { TaskService } from '../task/task.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './repository/review.repository';
import { REVIEW_ALREADY_EXISTS } from './review.const';
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

    if (
      task.customer !== customer ||
      task.contractor !== dto.contractor ||
      task.status !== TaskStatuses.Done
    ) {
      throw new UnauthorizedException();
    }

    // check if review was created earlier
    const existingReview = await this.reviewRepository.findByCustomerAndTask(
      customer,
      taskId
    );
    if (existingReview.length > 0) {
      throw new Error(REVIEW_ALREADY_EXISTS);
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
