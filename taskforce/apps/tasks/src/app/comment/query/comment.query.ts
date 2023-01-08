import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_COMMENTS_LIMIT } from '../comment.const';

export class CommentQuery {
  @ApiProperty({
    description: 'comments limit',
    required: false,
    default: DEFAULT_COMMENTS_LIMIT,
    type: Number,
    example: '10',
  })
  @Transform(({ value }) => +value || DEFAULT_COMMENTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENTS_LIMIT;

  @ApiProperty({
    description: 'page number (pagination)',
    required: false,
    type: Number,
    example: '10',
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
