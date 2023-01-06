import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './repository/review.repository';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
