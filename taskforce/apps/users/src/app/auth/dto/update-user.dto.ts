import { ApiProperty } from '@nestjs/swagger';
import { CITIES } from '@taskforce/shared-types';
import {
  ArrayMaxSize,
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import {
  CITY_NOT_VALID_ERROR,
  USER_DATE_BIRTH_NOT_VALID_ERROR,
  USER_DESCRIPTON_MAX_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_SKILLS_MAX_NUM,
} from '../auth.const';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    required: false,
    minLength: USER_NAME_MIN_LENGTH,
    maxLength: USER_NAME_MAX_LENGTH,
    example: 'Keks Ivanov',
  })
  @IsString()
  @Length(USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH)
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: `City. One of: ${CITIES}`,
    required: false,
    example: 'Москва',
  })
  @IsIn(CITIES, { message: CITY_NOT_VALID_ERROR })
  @IsOptional()
  public city?: string;

  @ApiProperty({
    description: 'Birth date',
    required: false,
    example: '1900-12-01',
  })
  @IsISO8601({
    message: USER_DATE_BIRTH_NOT_VALID_ERROR,
  })
  @IsOptional()
  public birthDate?: string;

  @ApiProperty({
    description: 'User info',
    required: false,
    maxLength: USER_DESCRIPTON_MAX_LENGTH,
    example: 'I like cats...',
  })
  @IsString()
  @MaxLength(USER_DESCRIPTON_MAX_LENGTH)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'user skills',
    required: true,
    isArray: true,
    maxItems: USER_SKILLS_MAX_NUM,
    example: ['react', 'typescript', 'html', 'css'],
  })
  @ArrayMaxSize(USER_SKILLS_MAX_NUM)
  @IsString({ each: true })
  @IsOptional()
  public skills?: string[];
}
