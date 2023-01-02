import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ContractorRatingRdo {
  @ApiProperty({
    description: 'contractor Id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose()
  contractor: string;

  @ApiProperty({
    description: 'contractor raiting',
    required: true,
    example: 10.2,
  })
  @Expose()
  rating: number;

  @ApiProperty({
    description: 'place in rating',
    required: true,
    example: 1,
  })
  @Expose()
  place: number;
}
