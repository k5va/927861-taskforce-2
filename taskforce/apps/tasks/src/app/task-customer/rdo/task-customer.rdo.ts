import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCustomerRdo {
  @ApiProperty({
    description: 'customer Id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose()
  customer: string;

  @ApiProperty({
    description: 'Number of published tasks',
    required: true,
    example: 2,
  })
  @Expose()
  publishedTasksCount: number;

  @ApiProperty({
    description: 'Number of new tasks',
    required: true,
    example: 2,
  })
  @Expose()
  newTasksCount: number;
}
