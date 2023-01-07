import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_COMMENTS_LIMIT } from '../comment.const';

export class CommentQuery {
  @Transform(({ value }) => +value || DEFAULT_COMMENTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENTS_LIMIT;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
