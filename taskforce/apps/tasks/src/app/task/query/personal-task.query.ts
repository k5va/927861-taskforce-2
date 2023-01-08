import { ApiProperty } from '@nestjs/swagger';
import { TaskStatuses } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export class PersonalTaskQuery {
  @ApiProperty({
    description: 'tasks statuses',
    required: false,
    type: String,
    example: 'new,inProgress',
  })
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsIn(Object.values(TaskStatuses), { each: true })
  public statuses?: string[];
}
