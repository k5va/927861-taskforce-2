import { CRUDRepository } from '@taskforce/core';
import { TaskNotificationEntity } from './task-notification.entity';
import { TaskNotification } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskNotificationModel } from './task-notification.model';

@Injectable()
export class TaskNotificationRepository
  implements CRUDRepository<TaskNotificationEntity, string, TaskNotification>
{
  constructor(
    @InjectModel(TaskNotificationModel.name)
    private readonly taskNotificationModel: Model<TaskNotificationModel>
  ) {}

  public async create(item: TaskNotificationEntity): Promise<TaskNotification> {
    const newtaskNotification = new this.taskNotificationModel(item);
    return newtaskNotification.save();
  }

  public async destroy(id: string): Promise<void> {
    this.taskNotificationModel.findByIdAndDelete(id);
  }

  public async findById(id: string): Promise<TaskNotification | null> {
    return this.taskNotificationModel.findById(id).exec();
  }

  public async findNotNotified(): Promise<TaskNotification[]> {
    return this.taskNotificationModel
      .find({
        notifyDate: undefined,
      })
      .exec();
  }

  public async updateNotifyDate(
    ids: string[],
    notifyDate: Date
  ): Promise<void> {
    this.taskNotificationModel
      .updateMany(
        {
          _id: { $in: ids },
        },
        {
          notifyDate,
        }
      )
      .exec();
  }

  public async update(
    id: string,
    data: Partial<TaskNotificationEntity>
  ): Promise<TaskNotification> {
    return this.taskNotificationModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }
}
