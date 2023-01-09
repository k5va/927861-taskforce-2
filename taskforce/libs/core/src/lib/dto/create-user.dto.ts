import { CITIES, UserRoles, UserRole } from '@taskforce/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsISO8601,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import {
  CITY_NOT_VALID_ERROR,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  ROLE_NOT_VALID_ERROR,
  USER_DATE_BIRTH_NOT_VALID_ERROR,
  USER_EMAIL_NOT_VALID_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USER_TOO_YOUNG_ERROR,
  USER_MIN_AGE,
  USER_BIRTHDATE_PATTERN,
} from '../const/auth.const';
import { IsOlderThan } from '@taskforce/core';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    required: true,
    minLength: USER_NAME_MIN_LENGTH,
    maxLength: USER_NAME_MAX_LENGTH,
    example: 'Keks Ivanov',
  })
  @IsString()
  @Length(USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH)
  public name: string;

  @ApiProperty({
    description: 'Unique email',
    required: true,
    example: 'keks@mail.no',
  })
  @IsEmail({}, { message: USER_EMAIL_NOT_VALID_ERROR })
  public email: string;

  @ApiProperty({
    description: `City. One of: ${CITIES}`,
    required: true,
    example: 'Москва',
  })
  @IsIn(CITIES, { message: CITY_NOT_VALID_ERROR })
  public city: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    minLength: PASSWORD_MIN_LENGTH,
    maxLength: PASSWORD_MAX_LENGTH,
    example: '123456',
  })
  @IsString()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  public password: string;

  @ApiProperty({
    description: 'User role: Customer or Contractor',
    required: true,
    example: 'Customer',
  })
  @IsIn(Object.values(UserRoles), { message: ROLE_NOT_VALID_ERROR })
  public role: UserRole;

  @ApiProperty({
    description: 'Birth date',
    format: 'YYYY-MM-DD',
    required: true,
    example: '1990-12-01',
  })
  @IsISO8601({
    message: USER_DATE_BIRTH_NOT_VALID_ERROR,
  })
  @Matches(USER_BIRTHDATE_PATTERN, {
    message: USER_DATE_BIRTH_NOT_VALID_ERROR,
  })
  @IsOlderThan(USER_MIN_AGE, { message: USER_TOO_YOUNG_ERROR })
  public birthDate: string;
}
