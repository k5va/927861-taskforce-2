import { Module } from '@nestjs/common';
import { TaskNotificationController } from './task-notification.controller';
import { TaskNotificationService } from './task-notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskNotificationModel,
  TaskNotificationSchema,
} from './task-notification.model';
import { SenderModule } from '../sender/sender.module';
import { TaskNotificationRepository } from './task-notification.repository';
import { EmailSubscriberModule } from '../email-subscriber/email-subscriber.module';

@Module({
  imports: [
    SenderModule,
    EmailSubscriberModule,
    MongooseModule.forFeature([
      { name: TaskNotificationModel.name, schema: TaskNotificationSchema },
    ]),
  ],
  controllers: [TaskNotificationController],
  providers: [TaskNotificationService, TaskNotificationRepository],
})
export class TaskNotificationModule {}
