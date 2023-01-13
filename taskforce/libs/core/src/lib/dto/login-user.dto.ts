import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserDtoError } from '../const/auth.const';

export class LoginUserDto {
  @ApiProperty({
    description: 'Unique email',
    required: true,
    example: 'keks@mail.no',
  })
  @IsEmail({}, { message: UserDtoError.EmailNotValid })
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
