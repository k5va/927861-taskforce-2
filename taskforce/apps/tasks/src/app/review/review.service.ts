import { Injectable } from '@nestjs/common';
import { Review } from '@taskforce/shared-types';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './repository/review.repository';
import { REVIEW_ALREADY_EXISTS } from './review.const';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  public async create(dto: CreateReviewDto, customer: string): Promise<Review> {
    // TODO: check customer === task.customer and contractor === task.contractor
    const existingReview = await this.reviewRepository.findByCustomerAndTask(
      customer,
      dto.taskId
    );
    if (existingReview.length > 0) {
      throw new Error(REVIEW_ALREADY_EXISTS);
    }

    const reviewEntity = new ReviewEntity({
      ...dto,
      customer,
    });

    return this.reviewRepository.create(reviewEntity);
  }

  public async findbyContractor(constractor: string): Promise<Review[]> {
    return this.reviewRepository.findByContractor(constractor);
  }
}
