import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ContractorRdo {
  @ApiProperty({
    description: 'User Id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose({ name: '_id' })
  @Type(() => String)
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
    description: 'User info',
    required: true,
    example: 'I like cats...',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'User role: Customer or Contractor',
    required: true,
    example: 'Customer',
  })
  @Expose()
  role: string;

  @ApiProperty({
    description: 'User age',
    required: true,
    example: '29',
  })
  @Expose()
  age: number;

  @ApiProperty({
    description: 'User rating',
    required: true,
    example: '4.5',
  })
  @Expose()
  rating: number;

  @ApiProperty({
    description: 'Place in rating',
    required: true,
    example: '2',
  })
  @Expose()
  placeInRating: number;

  @ApiProperty({
    description: 'Number of completed tasks',
    required: true,
    example: '2',
  })
  @Expose()
  CompletedTasks: number;

  @ApiProperty({
    description: 'Number of failed tasks',
    required: true,
    example: '2',
  })
  @Expose()
  failedTasks: number;

  @ApiProperty({
    description: 'user skills',
    required: true,
    isArray: true,
    maxItems: 5,
    example: ['react', 'typescript', 'html', 'css'],
  })
  @Expose()
  skills: number;
}
