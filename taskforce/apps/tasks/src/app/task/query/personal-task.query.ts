import { TaskStatus } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import {} from '../task.const';

export class PersonalTaskQuery {
  @Transform(({ value }) => value.split(','))
  @IsIn(Object.values(TaskStatus))
  @IsOptional()
  public statuses?: string[];
}
