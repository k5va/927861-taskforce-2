import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { ReviewTextLength, RatingValue } from '../const/review.const';

export class CreateReviewDto {
  @ApiProperty({
    description: 'review text',
    required: true,
    example: 'Very nice!',
    minLength: ReviewTextLength.Min,
    maxLength: ReviewTextLength.Max,
  })
  @IsString()
  @Length(ReviewTextLength.Min, ReviewTextLength.Max)
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
    minimum: RatingValue.Min,
    maximum: RatingValue.Max,
  })
  @IsNumber()
  @Min(RatingValue.Min)
  @Max(RatingValue.Max)
  public rating: number;
}
