import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import {
  DEFAULT_TASKS_LIMIT,
  DEFAULT_TASK_SORT_TYPE,
  TASK_SORT_TYPES,
} from '../task.const';

export class TaskQuery {
  @ApiProperty({
    description: 'tasks limit',
    required: false,
    default: DEFAULT_TASKS_LIMIT,
    example: 10,
  })
  @Transform(({ value }) => +value || DEFAULT_TASKS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASKS_LIMIT;

  @ApiProperty({
    description: 'task categories categories id',
    required: false,
    isArray: false,
    type: String,
    example: '1,2',
  })
  @Transform(({ value }) => value.split(',').map((categoryId) => +categoryId))
  @IsArray()
  @IsOptional()
  public categories?: number[];

  @ApiProperty({
    description: 'tags',
    required: false,
    example: 'tag1,tag2',
    isArray: false,
    type: String,
  })
  @Transform(({ value }) => value.split(','))
  @IsArray({})
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'task cities',
    required: false,
    example: 'Москва,Владивосток',
    isArray: false,
    type: String,
  })
  @Transform(({ value }) => value.split(','))
  @IsArray({})
  @IsOptional()
  public cities?: string[];

  @ApiProperty({
    description: 'task sort type',
    required: false,
    default: DEFAULT_TASK_SORT_TYPE,
    example: 'popular',
  })
  @IsIn(TASK_SORT_TYPES)
  @IsOptional()
  public sort: typeof TASK_SORT_TYPES[number] = DEFAULT_TASK_SORT_TYPE;

  @ApiProperty({
    description: 'current page (pagination)',
    required: false,
    example: 2,
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
