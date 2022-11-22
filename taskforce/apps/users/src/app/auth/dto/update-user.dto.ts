import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    required: false,
    minLength: 3,
    maxLength: 50,
    example: 'Keks Ivanov',
  })
  public name?: string;

  @ApiProperty({
    description: 'City. One of: Москва, Санкт-Петербург, Владивосток',
    required: false,
    example: 'Москва',
  })
  public city?: string;

  @ApiProperty({
    description: 'Birth date',
    required: false,
    example: '1900-12-01',
  })
  public birthDate?: string;

  @ApiProperty({
    description: 'User info',
    required: false,
    maxLength: 300,
    example: 'I like cats...',
  })
  public description?: string;

  @ApiProperty({
    description: 'user skills',
    required: true,
    isArray: true,
    maxItems: 5,
    example: ['react', 'typescript', 'html', 'css'],
  })
  public skills?: string[];
}
