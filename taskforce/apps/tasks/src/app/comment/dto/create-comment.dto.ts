import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '../comment.const';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    required: true,
    example: 'Very nice!',
    minLength: COMMENT_MIN_LENGTH,
    maxLength: COMMENT_MAX_LENGTH,
  })
  @IsString()
  @Length(COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH)
  public text: string;
}
