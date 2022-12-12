import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'New unique category name',
    required: true,
    example: 'cleaning',
  })
  @IsString()
  public name: string;
}
