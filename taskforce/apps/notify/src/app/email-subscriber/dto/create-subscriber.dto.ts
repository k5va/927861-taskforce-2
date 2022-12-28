import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  NAME_IS_EMPTY,
  USER_ID_IS_EMPTY,
} from '../email-subscriber.const';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  email: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  name: string;

  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  userId: string;
}
