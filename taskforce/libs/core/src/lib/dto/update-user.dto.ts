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
  UserDtoError,
  UserNameLength,
  UserSkillsCount,
  USER_BIRTHDATE_PATTERN,
  USER_DESCRIPTON_MAX_LENGTH,
  USER_MIN_AGE,
} from '../const/auth.const';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    required: false,
    minLength: UserNameLength.Min,
    maxLength: UserNameLength.Max,
    example: 'Keks Ivanov',
  })
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max)
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: `City. One of: ${CITIES}`,
    required: false,
    example: 'Москва',
  })
  @IsIn(CITIES, { message: UserDtoError.CityNotValid })
  @IsOptional()
  public city?: string;

  @ApiProperty({
    description: 'Birth date',
    format: 'YYYY-MM-DD',
    required: false,
    example: '1990-12-01',
  })
  @IsISO8601({
    message: UserDtoError.BirthdateNotValid,
  })
  @Matches(USER_BIRTHDATE_PATTERN, {
    message: UserDtoError.BirthdateNotValid,
  })
  @IsOlderThan(USER_MIN_AGE, { message: UserDtoError.TooYoung })
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
    minItems: UserSkillsCount.Min,
    maxItems: UserSkillsCount.Max,
    example: ['react', 'typescript', 'html', 'css'],
  })
  @ArrayMinSize(UserSkillsCount.Min)
  @ArrayMaxSize(UserSkillsCount.Max)
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value, obj, key }) => {
    obj[key] = [...new Set(value)];
    return obj[key];
  }) // removes dublicates
  public skills?: string[];
}
