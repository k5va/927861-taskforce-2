import { AbstractEntity } from '@taskforce/core';
import { Review } from '@taskforce/shared-types';

export class ReviewEntity extends AbstractEntity implements Review {
  public id?: number;
  public contractor: string;
  public taskId: number;
  public customer: string;
  public rating: number;
  public text: string;
  public registerDate?: Date;

  constructor(data: Review) {
    super();

    this.id = data.id;
    this.contractor = data.contractor;
    this.taskId = data.taskId;
    this.customer = data.customer;
    this.rating = data.rating;
    this.text = data.text;
    this.registerDate = data.registerDate;
  }
}
