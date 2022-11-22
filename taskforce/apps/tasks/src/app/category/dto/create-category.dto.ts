import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'New unique category name',
    required: true,
    example: 'cleaning',
  })
  public name: string;
}
