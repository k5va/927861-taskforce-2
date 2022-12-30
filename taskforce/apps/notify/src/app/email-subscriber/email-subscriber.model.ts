import { Document } from 'mongoose';
import { Subscriber, UserRole } from '@taskforce/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SUBSCRIBERS_COLLECTION_NAME } from './email-subscriber.const';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  public role: UserRole;

  @Prop({
    required: true,
    unique: true,
  })
  public userId: string;
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);
