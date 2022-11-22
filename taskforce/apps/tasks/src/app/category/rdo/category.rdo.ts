import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryRdo {
  @ApiProperty({
    description: 'Categoru id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose({ name: '_id'})
  id: string;

  @ApiProperty({
    description: 'Category name',
    required: true,
    example: 'cleaning',
  })
  @Expose()
  name: string;
}
