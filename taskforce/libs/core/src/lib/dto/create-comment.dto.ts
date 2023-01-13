import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { CommentLength } from '../const/comment.const';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    required: true,
    example: 'Very nice!',
    minLength: CommentLength.Min,
    maxLength: CommentLength.Max,
  })
  @IsString()
  @Length(CommentLength.Min, CommentLength.Max)
  public text: string;
}
