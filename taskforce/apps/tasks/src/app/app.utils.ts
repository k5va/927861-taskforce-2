import { TaskContractor } from '@taskforce/shared-types';
import { DEFAULT_RATING } from './app.const';

export const calculateRating = ({
  ratingSum,
  reviewsCount,
  failedTasksCount,
}: TaskContractor) =>
  reviewsCount > 0
    ? ratingSum / (reviewsCount + failedTasksCount)
    : DEFAULT_RATING;
