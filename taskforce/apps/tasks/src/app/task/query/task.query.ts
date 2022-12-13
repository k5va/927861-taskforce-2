import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import {
  DEFAULT_TASKS_LIMIT,
  DEFAULT_TASK_SORT_TYPE,
  TASK_SORT_TYPES,
} from '../task.const';

export class TaskQuery {
  @Transform(({ value }) => +value || DEFAULT_TASKS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASKS_LIMIT;

  @Transform(({ value }) => value.split(',').map((categoryId) => +categoryId))
  @IsArray()
  @IsOptional()
  public categories?: number[];

  @Transform(({ value }) => value.split(','))
  @IsArray({})
  @IsOptional()
  public tags?: string[];

  @Transform(({ value }) => value.split(','))
  @IsArray({})
  @IsOptional()
  public cities?: string[];

  @IsIn(TASK_SORT_TYPES)
  @IsOptional()
  public sort: typeof TASK_SORT_TYPES[number] = DEFAULT_TASK_SORT_TYPE;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
