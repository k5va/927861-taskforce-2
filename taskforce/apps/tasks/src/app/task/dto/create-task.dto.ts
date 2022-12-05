import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    required: true,
    minLength: 20,
    maxLength: 50,
    example: 'Need cleaning services',
  })
  public title: string;

  @ApiProperty({
    description: 'Task description',
    required: true,
    minLength: 100,
    maxLength: 1024,
    example: 'Description ...',
  })
  public description: string;

  @ApiProperty({
    description: 'Task category id',
    required: true,
    example: '123',
  })
  public categoryId: number;

  @ApiProperty({
    description: 'Task price',
    required: false,
    minimum: 0,
    example: 100,
  })
  public price?: number;

  @ApiProperty({
    description: 'Task due datet',
    required: false,
    example: '2022-11-29',
  })
  public dueDate?: string;

  @ApiProperty({
    description: 'Task address',
    required: false,
    minLength: 10,
    maxLength: 255,
    example: 'Some address...',
  })
  public address?: string;

  @ApiProperty({
    description: 'tags',
    required: false,
    example: ['tag1', 'tag2'],
  })
  public tags?: string[];
}
