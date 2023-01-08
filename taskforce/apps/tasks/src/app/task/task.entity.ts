import { AbstractEntity } from '@taskforce/core';
import { Task, Comment, Response } from '@taskforce/shared-types';

export class TaskEntity extends AbstractEntity implements Task {
  public id?: number;
  public title: string;
  public description: string;
  public categoryId: number;
  public price?: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public city: string;
  public tags?: string[];
  public customer: string;
  public registerDate: Date;
  public status: string;
  public contractor?: string;
  public comments: Comment[];
  public responses: Response[];

  constructor(data: Task) {
    super();

    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.price = data.price;
    this.dueDate = data.dueDate;
    this.image = data.image;
    this.address = data.address;
    this.city = data.city;
    this.tags = data.tags;
    this.customer = data.customer;
    this.registerDate = data.registerDate;
    this.status = data.status;
    this.contractor = data.contractor;
    this.comments = data.comments;
    this.responses = data.responses;
  }
}
