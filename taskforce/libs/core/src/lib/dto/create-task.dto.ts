import { ApiProperty } from '@nestjs/swagger';
import { IsDateGreaterThan, transformTags } from '@taskforce/core';
import { CITIES } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsIn,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import {
  TAG_FORMAT_PATTERN,
  TaskAddressLength,
  TaskDescriptionLength,
  TaskDtoError,
  TaskTagLength,
  TaskTitleLength,
  TASK_PRICE_MIN_VALUE,
  TASK_TAGS_MAX_NUM,
} from '../const/task.const';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    required: true,
    minLength: TaskTitleLength.Min,
    maxLength: TaskTitleLength.Max,
    example: 'Need cleaning services',
  })
  @IsString()
  @Length(TaskTitleLength.Min, TaskTitleLength.Max)
  public title: string;

  @ApiProperty({
    description: 'Task description',
    required: true,
    minLength: TaskDescriptionLength.Min,
    maxLength: TaskDescriptionLength.Max,
    example: 'Description ...',
  })
  @IsString()
  @Length(TaskDescriptionLength.Min, TaskDescriptionLength.Max)
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
  @IsDateGreaterThan(new Date(), {
    message: TaskDtoError.DueDateLessThanCurrent,
  })
  public dueDate?: string;

  @ApiProperty({
    description: 'Task address',
    required: false,
    minLength: TaskAddressLength.Min,
    maxLength: TaskAddressLength.Max,
    example: 'Some address...',
  })
  @IsString()
  @Length(TaskAddressLength.Min, TaskAddressLength.Max)
  @IsOptional()
  public address?: string;

  @ApiProperty({
    description: `City. One of: ${CITIES}`,
    required: true,
    example: 'Москва',
  })
  @IsString()
  @IsIn(CITIES)
  public city: string;

  @ApiProperty({
    description: 'tags',
    required: false,
    example: ['tag1', 'tag2'],
  })
  @IsOptional()
  @IsString({ each: true })
  @Length(TaskTagLength.Min, TaskTagLength.Max, { each: true })
  @ArrayMaxSize(TASK_TAGS_MAX_NUM)
  @Matches(TAG_FORMAT_PATTERN, {
    each: true,
    message: TaskDtoError.TagFormatNotValid,
  })
  @Transform(transformTags) // makes lowercase and removes dublicates
  public tags?: string[];
}
