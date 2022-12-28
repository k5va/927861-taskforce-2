import { CRUDRepository } from '@taskforce/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { Subscriber } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailSubscriberModel } from './email-subscriber.model';

@Injectable()
export class EmailSubscriberRepository
  implements CRUDRepository<EmailSubscriberEntity, string, Subscriber>
{
  constructor(
    @InjectModel(EmailSubscriberModel.name)
    private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<Subscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.emailSubscriberModel.findByIdAndDelete(id);
  }

  public async findById(id: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel.findOne({ email }).exec();
  }

  public async update(
    id: string,
    data: Partial<EmailSubscriberEntity>
  ): Promise<Subscriber> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }
}
