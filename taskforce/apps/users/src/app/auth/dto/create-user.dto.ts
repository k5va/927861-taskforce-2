import { UserRole } from '@taskforce/shared-types';

export class CreateUserDto {
  public name: string;
  public email: string;
  public city: string;
  public password: string;
  public role: UserRole;
  public birthDate: Date;
}
