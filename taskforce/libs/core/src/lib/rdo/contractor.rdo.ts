import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { calculateAge } from '@taskforce/core';

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
  @Expose({ name: 'createdAt' })
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
    description: 'User rating',
    required: true,
    example: 4.5,
  })
  @Expose()
  rating: number;

  @ApiProperty({
    description: 'Place in rating',
    required: true,
    example: 2,
  })
  @Expose()
  placeInRating: number;

  @ApiProperty({
    description: 'Number of completed tasks',
    required: true,
    example: 2,
  })
  @Expose()
  finishedTasks: number;

  @ApiProperty({
    description: 'Number of failed tasks',
    required: true,
    example: 2,
  })
  @Expose()
  failedTasks: number;

  @ApiProperty({
    description: 'user skills',
    required: true,
    isArray: true,
    example: ['react', 'typescript', 'html', 'css'],
  })
  @Expose()
  skills: string[];

  @ApiProperty({
    description: 'Age',
    required: true,
    example: 20,
  })
  @Expose({ name: 'birthDate' })
  @Transform(({ value }) => calculateAge(value))
  age: number;

  @ApiProperty({
    description: 'User avatar',
    example: '7pDY9SzWb_rIH_6sHcRbb.jpeg',
    required: false,
  })
  @Expose()
  avatar: string;
}
