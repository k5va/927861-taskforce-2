import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EMAIL_SUBSCRIBER_EXISTS } from './email-subscriber.const';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { SenderService } from '../sender/sender.service';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly senderService: SenderService
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existingSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existingSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    const newSubscriber = await this.emailSubscriberRepository.create(
      new EmailSubscriberEntity(subscriber)
    );

    this.senderService.sendNotifyNewSubscriber(newSubscriber);

    return newSubscriber;
  }
}
