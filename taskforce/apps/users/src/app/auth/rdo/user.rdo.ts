import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'User Id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose({ name: '_id'})
  id: string;

  @ApiProperty({
    description: 'User name',
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'Keks Ivanov',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Unique email',
    required: true,
    example: 'keks@mail.no',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Registration date',
    required: true,
    example: '2022-11-29',
  })
  @Expose()
  registerDate: string;

  @ApiProperty({
    description: 'City. One of: Москва, Санкт-Петербург, Владивосток',
    required: true,
    example: 'Москва',
  })
  @Expose()
  city: string;

  @ApiProperty({
    description: 'User role: Customer or Contractor',
    required: true,
    example: 'Customer',
  })
  @Expose()
  role: string;
}
