import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { USER_EMAIL_NOT_VALID_ERROR } from '../auth.const';

export class LoginUserDto {
  @ApiProperty({
    description: 'Unique email',
    required: true,
    example: 'keks@mail.no',
  })
  @IsEmail({}, { message: USER_EMAIL_NOT_VALID_ERROR })
  public email: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: '123456',
  })
  @IsString()
  public password: string;
}
