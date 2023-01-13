import { UserRole, UserRoles } from '@taskforce/shared-types';
import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import { EmailSubscriberError } from '../email-subscriber.const';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailSubscriberError.EmailNotValid })
  email: string;

  @IsNotEmpty({ message: EmailSubscriberError.NameIsEmpty })
  name: string;

  @IsIn(Object.values(UserRoles), {
    message: EmailSubscriberError.RoleNotValid,
  })
  role: UserRole;

  @IsNotEmpty({ message: EmailSubscriberError.UserIdIsEmpty })
  userId: string;
}
