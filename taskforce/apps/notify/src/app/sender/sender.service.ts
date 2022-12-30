import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber, TaskNotification } from '@taskforce/shared-types';
import {
  EMAIL_ADD_SUBSCRIBER_SUBJECT,
  EMAIL_NEW_TASKS_SUBJECT,
} from './sender.const';

@Injectable()
export class SenderService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber({ email, name }: Subscriber) {
    return await this.mailerService.sendMail({
      to: email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        name,
        email,
      },
    });
  }

  public async sendNotifyNewTasks(
    subscribers: Subscriber[],
    taskNotifications: TaskNotification[]
  ) {
    for (const { email, name } of subscribers) {
      this.mailerService.sendMail({
        to: email,
        subject: EMAIL_NEW_TASKS_SUBJECT,
        template: './new-tasks',
        context: {
          name,
          taskNotifications,
        },
      });
    }
  }
}
