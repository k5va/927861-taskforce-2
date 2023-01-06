import { ApiProperty } from '@nestjs/swagger';
import { TaskCommands } from '@taskforce/shared-types';
import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class ChangeTaskStatusDto {
  @ApiProperty({
    description: 'Change task status command',
    required: true,
    example: TaskCommands.cancel,
  })
  @IsIn(Object.values(TaskCommands))
  public command: string;

  @ApiProperty({
    description: 'Task contractor id',
    required: false,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @ValidateIf((o: ChangeTaskStatusDto) => o.command === TaskCommands.start)
  @IsString()
  @IsNotEmpty()
  public contractor?: string;
}
