import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsISO8601,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import {
  TASK_ADDRESS_MAX_LENGTH,
  TASK_ADDRESS_MIN_LENGTH,
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_DESCRIPTION_MIN_LENGTH,
  TASK_PRICE_MIN_VALUE,
  TASK_TAGS_MAX_NUM,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from '../task.const';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    required: false,
    minLength: TASK_TITLE_MIN_LENGTH,
    maxLength: TASK_TITLE_MAX_LENGTH,
    example: 'Need cleaning services',
  })
  @IsString()
  @Length(TASK_TITLE_MIN_LENGTH, TASK_TITLE_MAX_LENGTH)
  public title?: string;

  @ApiProperty({
    description: 'Task description',
    required: false,
    minLength: TASK_DESCRIPTION_MIN_LENGTH,
    maxLength: TASK_DESCRIPTION_MAX_LENGTH,
    example: 'Description ...',
  })
  @IsString()
  @Length(TASK_DESCRIPTION_MIN_LENGTH, TASK_DESCRIPTION_MAX_LENGTH)
  public description?: string;

  @ApiProperty({
    description: 'Task category Id',
    required: false,
    example: '123',
  })
  @IsNumber()
  public categoryId?: number;

  @ApiProperty({
    description: 'Task price',
    required: false,
    minimum: TASK_PRICE_MIN_VALUE,
    example: 100,
  })
  @IsNumber()
  @Min(TASK_PRICE_MIN_VALUE)
  public price?: number;

  @ApiProperty({
    description: 'Task due date',
    required: false,
    example: '2022-11-29',
  })
  @IsISO8601()
  public dueDate?: string;

  @ApiProperty({
    description: 'Task address',
    required: false,
    minLength: TASK_ADDRESS_MIN_LENGTH,
    maxLength: TASK_ADDRESS_MAX_LENGTH,
    example: 'Some address...',
  })
  @IsString()
  @Length(TASK_ADDRESS_MIN_LENGTH, TASK_ADDRESS_MAX_LENGTH)
  public address?: string;

  @ApiProperty({
    description: 'tags',
    required: false,
    example: ['tag1', 'tag2'],
  })
  @IsString({ each: true })
  @ArrayMaxSize(TASK_TAGS_MAX_NUM)
  public tags?: string[];
}
