import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber, TaskNotification } from '@taskforce/shared-types';
import { EmailSubject } from './sender.const';

@Injectable()
export class SenderService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber({ email, name }: Subscriber) {
    return await this.mailerService.sendMail({
      to: email,
      subject: EmailSubject.AddSubscriber,
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
        subject: EmailSubject.NewTasks,
        template: './new-tasks',
        context: {
          name,
          taskNotifications,
        },
      });
    }
  }
}
