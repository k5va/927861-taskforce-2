import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewRdo {
  @ApiProperty({
    description: 'Review Id',
    required: true,
    example: '12',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Review text',
    required: true,
    example: 'Very nice ...',
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Comment author user Id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose()
  customer: string;

  @ApiProperty({
    description: 'Task Id',
    required: true,
    example: 1,
  })
  @Expose()
  taskId: number;

  @ApiProperty({
    description: 'Review registration date',
    required: true,
    example: '2022-11-29',
  })
  @Expose()
  registerDate: string;

  @ApiProperty({
    description: 'Contractor rating',
    required: true,
    example: 4,
  })
  @Expose()
  rating: number;

  @ApiProperty({
    description: 'contractor user Id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose()
  contractor: string;
}
