import { AbstractEntity } from '@taskforce/core';
import { TaskNotification } from '@taskforce/shared-types';

export class TaskNotificationEntity
  extends AbstractEntity
  implements TaskNotification
{
  public _id?: string;
  public title: string;
  public address?: string;
  public price?: number;
  public dueDate?: Date;
  public taskId: number;
  public notifyDate?: Date;

  constructor(data: TaskNotification) {
    super();

    this._id = data._id;
    this.title = data.title;
    this.address = data.address;
    this.price = data.price;
    this.dueDate = data.dueDate;
    this.taskId = data.taskId;
    this.notifyDate = data.notifyDate;
  }
}
