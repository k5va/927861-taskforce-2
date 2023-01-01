import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './repository/review.repository';

@Module({
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService],
  exports: [ReviewService],
})
export class ResponseModule {}
