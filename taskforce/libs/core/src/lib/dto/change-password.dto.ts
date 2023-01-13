import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PasswordLength } from '../const/auth.const';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'old password',
    required: true,
    minLength: PasswordLength.Min,
    maxLength: PasswordLength.Max,
    example: '123456',
  })
  @IsString()
  public oldPassword: string;

  @ApiProperty({
    description: 'new password',
    required: true,
    minLength: PasswordLength.Min,
    maxLength: PasswordLength.Max,
    example: '1234567',
  })
  @IsString()
  public newPassword: string;
}
