import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryRdo {
  @ApiProperty({
    description: 'Category id',
    required: true,
    example: '12',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Category name',
    required: true,
    example: 'cleaning',
  })
  @Expose()
  name: string;
}
