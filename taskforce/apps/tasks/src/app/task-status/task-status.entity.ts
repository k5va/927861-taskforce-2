import { AbstractEntity } from '@taskforce/core';
import { TaskContractor } from '@taskforce/shared-types';

export class TaskContractorEntity
  extends AbstractEntity
  implements TaskContractor
{
  public id?: number;
  public contractor: string;
  public failedTasksCount?: number;
  public doneTasksCount?: number;
  public reviewsCount?: number;
  public ratingSum?: number;
  public rating?: number;

  constructor(data: TaskContractor) {
    super();

    this.id = data.id;
    this.contractor = data.contractor;
    this.failedTasksCount = data.failedTasksCount;
    this.doneTasksCount = data.doneTasksCount;
    this.reviewsCount = data.reviewsCount;
    this.ratingSum = data.ratingSum;
    this.rating = data.rating;
  }
}
