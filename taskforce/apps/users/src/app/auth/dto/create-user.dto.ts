import { UserRole } from '@taskforce/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'Keks Ivanov',
  })
  public name: string;

  @ApiProperty({
    description: 'Unique email',
    required: true,
    example: 'keks@mail.no',
  })
  public email: string;

  @ApiProperty({
    description: 'City. One of: Москва, Санкт-Петербург, Владивосток',
    required: true,
    example: 'Москва',
  })
  public city: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: '123456',
  })
  public password: string;

  @ApiProperty({
    description: 'User role: Customer or Contractor',
    required: true,
    example: 'Customer',
  })
  public role: UserRole;

  @ApiProperty({
    description: 'Birth date',
    required: true,
    example: '1900-12-01',
  })
  public birthDate: string;
}
