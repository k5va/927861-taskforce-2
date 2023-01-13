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
  UserDtoError,
  UserNameLength,
  PasswordLength,
  USER_MIN_AGE,
  USER_BIRTHDATE_PATTERN,
} from '../const/auth.const';
import { IsOlderThan } from '@taskforce/core';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    required: true,
    minLength: UserNameLength.Min,
    maxLength: UserNameLength.Max,
    example: 'Keks Ivanov',
  })
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max)
  public name: string;

  @ApiProperty({
    description: 'Unique email',
    required: true,
    example: 'keks@mail.no',
  })
  @IsEmail({}, { message: UserDtoError.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: `City. One of: ${CITIES}`,
    required: true,
    example: 'Москва',
  })
  @IsIn(CITIES, { message: UserDtoError.CityNotValid })
  public city: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    minLength: PasswordLength.Min,
    maxLength: PasswordLength.Max,
    example: '123456',
  })
  @IsString()
  @Length(PasswordLength.Min, PasswordLength.Max)
  public password: string;

  @ApiProperty({
    description: 'User role: Customer or Contractor',
    required: true,
    example: 'Customer',
  })
  @IsIn(Object.values(UserRoles), { message: UserDtoError.RoleNotValid })
  public role: UserRole;

  @ApiProperty({
    description: 'Birth date',
    format: 'YYYY-MM-DD',
    required: true,
    example: '1990-12-01',
  })
  @IsISO8601({
    message: UserDtoError.BirthdateNotValid,
  })
  @Matches(USER_BIRTHDATE_PATTERN, {
    message: UserDtoError.BirthdateNotValid,
  })
  @IsOlderThan(USER_MIN_AGE, { message: UserDtoError.TooYoung })
  public birthDate: string;
}
