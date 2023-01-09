import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment Id',
    required: true,
    example: '12',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Comment text',
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
  author: string;

  @ApiProperty({
    description: 'Task Id',
    required: true,
    example: '1',
  })
  @Expose()
  taskId: number;

  @ApiProperty({
    description: 'Comment registration date',
    required: true,
    example: '2022-11-29',
  })
  @Expose()
  registerDate: string;
}
