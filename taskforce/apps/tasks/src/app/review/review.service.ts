import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Review, TaskStatuses } from '@taskforce/shared-types';
import { TaskService } from '../task/task.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './repository/review.repository';
import {
  REVIEW_ALREADY_EXISTS_ERROR,
  TASK_STATUS_NOT_DONE_ERROR,
  WRONG_CONTRACTOR_ERROR as CONTRACTOR_MISMATCH_ERROR,
  WRONG_CUSTOMER_ERROR as CUSTOMER_MISMATCH_ERROR,
} from './review.const';
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
      throw new UnauthorizedException(CUSTOMER_MISMATCH_ERROR);
    }

    if (task.contractor !== dto.contractor) {
      throw new BadRequestException(CONTRACTOR_MISMATCH_ERROR);
    }

    if (task.status !== TaskStatuses.Done) {
      throw new BadRequestException(TASK_STATUS_NOT_DONE_ERROR);
    }

    // check if review was created earlier
    const existingReview = await this.reviewRepository.findByCustomerAndTask(
      customer,
      taskId
    );
    if (existingReview.length > 0) {
      throw new ConflictException(REVIEW_ALREADY_EXISTS_ERROR);
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
