import { UserRole, UserRoles } from '@taskforce/shared-types';
import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  NAME_IS_EMPTY,
  ROLE_NOT_VALID,
  USER_ID_IS_EMPTY,
} from '../email-subscriber.const';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  email: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  name: string;

  @IsIn(Object.values(UserRoles), { message: ROLE_NOT_VALID })
  role: UserRole;

  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  userId: string;
}
