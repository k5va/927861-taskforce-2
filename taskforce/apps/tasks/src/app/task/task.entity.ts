import { AbstractEntity } from '@taskforce/core';
import { Task, TaskStatus } from '@taskforce/shared-types';

export class TaskEntity extends AbstractEntity implements Task {
  public _id: string;
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public customer: string;
  public registerDate: Date;
  public status: TaskStatus;
  public contractor?: string;

  constructor(data: Task) {
    super();

    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.price = data.price;
    this.dueDate = data.dueDate;
    this.image = data.image;
    this.address = data.address;
    this.tags = data.tags;
    this.customer = data.customer;
    this.registerDate = data.registerDate;
    this.status = data.status;
    this.contractor = data.contractor;
  }
}
