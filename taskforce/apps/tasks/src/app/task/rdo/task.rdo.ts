import { TaskStatus } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskRdo {
  @ApiProperty({
    description: 'Task Id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose({ name: '_id'})
  id: string;

  @ApiProperty({
    description: 'Task title',
    required: true,
    example: 'Need cleaning services',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Task description',
    required: true,
    example: 'Description...',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Task registration date',
    required: true,
    example: 'ISO date',
  })
  @Expose()
  registerDate: string;

  @ApiProperty({
    description: 'Task status',
    required: true,
    example: 'new',
  })
  @Expose()
  status: TaskStatus;

  @ApiProperty({
    description: 'Task category',
    required: true,
    example: 'cleaning',
  })
  @Expose()
  category: string;

  @ApiProperty({
    description: 'Task price',
    required: false,
    example: '100',
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Task due date',
    required: false,
    example: '2022-11-29',
  })
  @Expose()
  dueDate: Date;

  @ApiProperty({
    description: 'Task image link',
    required: false,
    example: '...',
  })
  @Expose()
  image: string;

  @ApiProperty({
    description: 'Task address',
    required: false,
    example: 'Neptun',
  })
  @Expose()
  address: string;

  @ApiProperty({
    description: 'Task tags',
    required: false,
    example: ['tag1', 'tag2'],
  })
  @Expose()
  tags: string[];

  @ApiProperty({
    description: 'Task customer id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose()
  customer: string;
}
