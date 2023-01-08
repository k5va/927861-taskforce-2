export interface TaskContractor {
  id?: number;
  contractor: string;
  failedTasksCount?: number;
  doneTasksCount?: number;
  reviewsCount?: number;
  ratingSum?: number;
  rating?: number;
}
