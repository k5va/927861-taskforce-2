import { Document } from 'mongoose';
import { TaskNotification } from '@taskforce/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TASK_NOTIFICATION_COLLECTION_NAME } from './task-notification.const';

@Schema({
  collection: TASK_NOTIFICATION_COLLECTION_NAME,
  timestamps: true,
})
export class TaskNotificationModel
  extends Document
  implements TaskNotification
{
  @Prop({
    required: true,
  })
  public title: string;

  @Prop({
    required: false,
  })
  public price?: number;

  @Prop({
    required: false,
  })
  public dueDate?: Date;

  @Prop({
    required: false,
  })
  public address?: string;

  @Prop({
    required: true,
    unique: true,
  })
  public taskId: number;

  @Prop({
    required: false,
  })
  public notifyDate?: Date;
}

export const TaskNotificationSchema = SchemaFactory.createForClass(
  TaskNotificationModel
);
