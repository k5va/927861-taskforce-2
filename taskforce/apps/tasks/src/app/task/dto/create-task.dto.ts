import { ApiProperty } from '@nestjs/swagger';
import { CITIES } from '@taskforce/shared-types';
import {
  ArrayMaxSize,
  IsIn,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  NotContains,
} from 'class-validator';
import {
  TAG_MAX_LENGTH,
  TAG_MIN_LENGTH,
  TASK_ADDRESS_MAX_LENGTH,
  TASK_ADDRESS_MIN_LENGTH,
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_DESCRIPTION_MIN_LENGTH,
  TASK_PRICE_MIN_VALUE,
  TASK_TAGS_MAX_NUM,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from '../task.const';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    required: true,
    minLength: TASK_TITLE_MIN_LENGTH,
    maxLength: TASK_TITLE_MAX_LENGTH,
    example: 'Need cleaning services',
  })
  @IsString()
  @Length(TASK_TITLE_MIN_LENGTH, TASK_TITLE_MAX_LENGTH)
  public title: string;

  @ApiProperty({
    description: 'Task description',
    required: true,
    minLength: TASK_DESCRIPTION_MIN_LENGTH,
    maxLength: TASK_DESCRIPTION_MAX_LENGTH,
    example: 'Description ...',
  })
  @IsString()
  @Length(TASK_DESCRIPTION_MIN_LENGTH, TASK_DESCRIPTION_MAX_LENGTH)
  public description: string;

  @ApiProperty({
    description: 'Task category id',
    required: true,
    example: '123',
  })
  @IsNumber()
  public categoryId: number;

  @ApiProperty({
    description: 'Task price',
    required: false,
    minimum: TASK_PRICE_MIN_VALUE,
    example: 100,
  })
  @IsNumber()
  @Min(TASK_PRICE_MIN_VALUE)
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Task due date',
    required: false,
    example: '2022-11-29',
  })
  @IsISO8601()
  @IsOptional()
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
  @IsOptional()
  public address?: string;

  @IsString()
  @IsIn(CITIES)
  public city: string;

  @ApiProperty({
    description: 'tags',
    required: false,
    example: ['tag1', 'tag2'],
  })
  @IsString({ each: true })
  @Length(TAG_MIN_LENGTH, TAG_MAX_LENGTH, { each: true })
  @ArrayMaxSize(TASK_TAGS_MAX_NUM)
  @IsOptional()
  @NotContains(' ', {
    each: true,
  })
  public tags?: string[];
}
