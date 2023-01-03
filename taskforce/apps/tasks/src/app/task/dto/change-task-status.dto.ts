import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskStatuses } from '@taskforce/shared-types';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class ChangeTaskStatusDto {
  @ApiProperty({
    description: 'Task new status',
    required: true,
    example: 'cancelled',
  })
  @IsIn(Object.values(TaskStatuses))
  public status: TaskStatus;

  @ApiProperty({
    description: 'Task contractor id',
    required: false,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @IsString()
  @IsOptional()
  public contractor?: string;
}
