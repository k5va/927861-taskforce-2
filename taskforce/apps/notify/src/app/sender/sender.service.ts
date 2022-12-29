import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@taskforce/shared-types';
import {
  EMAIL_ADD_SUBSCRIBER_SUBJECT,
  EMAIL_NEW_TASKS_SUBJECT,
} from './sender.const';

@Injectable()
export class SenderService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    return await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        name: subscriber.name,
        email: subscriber.email,
      },
    });
  }

  public async sendNotifyNewTasks() {
    return await this.mailerService.sendMail({
      to: 'keks@local.me',
      subject: EMAIL_NEW_TASKS_SUBJECT,
      template: './new-tasks',
      context: {
        name: 'Keks',
      },
    });
  }
}
