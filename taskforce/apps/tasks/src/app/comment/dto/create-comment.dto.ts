import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    required: true,
    example: 'Very nice!',
  })
  public text: string;
}
