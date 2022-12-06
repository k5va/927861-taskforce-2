import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseRdo {
  @ApiProperty({
    description: 'Response id',
    required: true,
    example: '2',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Contractor id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose()
  contractor: string;

  @ApiProperty({
    description: 'Task id',
    required: true,
    example: '12',
  })
  @Expose()
  taskId: number;
}
