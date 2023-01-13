import { ConflictException, Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberError } from './email-subscriber.const';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { SenderService } from '../sender/sender.service';
import { Subscriber } from '@taskforce/shared-types';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly senderService: SenderService
  ) {}

  public async addSubscriber(
    subscriber: CreateSubscriberDto
  ): Promise<Subscriber> {
    const { email } = subscriber;
    const existingSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existingSubscriber) {
      throw new ConflictException(EmailSubscriberError.AlreadyExists);
    }

    const newSubscriber = await this.emailSubscriberRepository.create(
      new EmailSubscriberEntity(subscriber)
    );

    this.senderService.sendNotifyNewSubscriber(newSubscriber);

    return newSubscriber;
  }

  public async getAllContractors(): Promise<Subscriber[]> {
    return this.emailSubscriberRepository.findAllContractors();
  }
}
