import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';
import {
  RATING_MAX,
  RATING_MIN,
  TEXT_MAX_LENGTH,
  TEXT_MIN_LENGTH,
} from '../review.const';

export class CreateReviewDto {
  @ApiProperty({
    description: 'review text',
    required: true,
    example: 'Very nice!',
    minLength: TEXT_MIN_LENGTH,
    maxLength: TEXT_MAX_LENGTH,
  })
  @IsString()
  @Length(TEXT_MIN_LENGTH, TEXT_MAX_LENGTH)
  public text: string;

  @ApiProperty({
    description: 'Contractor id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @IsString()
  public contractor: string;

  @ApiProperty({
    description: 'contractor rating',
    required: true,
    example: 4,
    minimum: RATING_MIN,
    maximum: RATING_MAX,
  })
  @IsNumber()
  @Min(RATING_MIN)
  @Max(RATING_MAX)
  public rating: number;

  @ApiProperty({
    description: 'task Id',
    required: true,
    example: 0,
  })
  @IsNumber()
  public taskId: number;
}
