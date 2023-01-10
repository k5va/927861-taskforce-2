import { ApiProperty } from '@nestjs/swagger';
import { IsDateGreaterThan, transformTags } from '@taskforce/core';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import {
  DUE_DATE_LESS_THAN_CURRENT_ERROR,
  TAG_FORMAT_NOT_VALID_ERROR,
  TAG_FORMAT_PATTERN,
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
} from '../const/task.const';

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
  @IsOptional()
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
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Task category Id',
    required: false,
    example: '123',
  })
  @IsNumber()
  @IsOptional()
  public categoryId?: number;

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
  @IsOptional()
  @IsISO8601()
  @IsDateGreaterThan(new Date(), { message: DUE_DATE_LESS_THAN_CURRENT_ERROR })
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

  @ApiProperty({
    description: 'tags',
    required: false,
    example: ['tag1', 'tag2'],
  })
  @IsOptional()
  @IsString({ each: true })
  @Length(TAG_MIN_LENGTH, TAG_MAX_LENGTH, { each: true })
  @ArrayMaxSize(TASK_TAGS_MAX_NUM)
  @Matches(TAG_FORMAT_PATTERN, {
    each: true,
    message: TAG_FORMAT_NOT_VALID_ERROR,
  })
  @Transform(transformTags) // makes lowercase and removes dublicates
  public tags?: string[];
}
