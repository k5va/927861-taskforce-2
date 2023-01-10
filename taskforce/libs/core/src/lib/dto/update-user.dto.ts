import { ApiProperty } from '@nestjs/swagger';
import { IsOlderThan } from '@taskforce/core';
import { CITIES } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  CITY_NOT_VALID_ERROR,
  USER_BIRTHDATE_PATTERN,
  USER_DATE_BIRTH_NOT_VALID_ERROR,
  USER_DESCRIPTON_MAX_LENGTH,
  USER_MIN_AGE,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_SKILLS_MAX_NUM,
  USER_SKILLS_MIN_NUM,
  USER_TOO_YOUNG_ERROR,
} from '../const/auth.const';

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
    format: 'YYYY-MM-DD',
    required: false,
    example: '1990-12-01',
  })
  @IsISO8601({
    message: USER_DATE_BIRTH_NOT_VALID_ERROR,
  })
  @Matches(USER_BIRTHDATE_PATTERN, {
    message: USER_DATE_BIRTH_NOT_VALID_ERROR,
  })
  @IsOlderThan(USER_MIN_AGE, { message: USER_TOO_YOUNG_ERROR })
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
    minItems: USER_SKILLS_MIN_NUM,
    maxItems: USER_SKILLS_MAX_NUM,
    example: ['react', 'typescript', 'html', 'css'],
  })
  @ArrayMinSize(USER_SKILLS_MIN_NUM)
  @ArrayMaxSize(USER_SKILLS_MAX_NUM)
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value, obj, key }) => {
    obj[key] = [...new Set(value)];
    return obj[key];
  }) // removes dublicates
  public skills?: string[];
}
