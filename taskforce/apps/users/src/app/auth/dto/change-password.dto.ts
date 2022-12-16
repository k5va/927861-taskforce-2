import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../auth.const';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'old password',
    required: true,
    minLength: PASSWORD_MIN_LENGTH,
    maxLength: PASSWORD_MAX_LENGTH,
    example: '123456',
  })
  @IsString()
  public oldPassword: string;

  @ApiProperty({
    description: 'new password',
    required: true,
    minLength: PASSWORD_MIN_LENGTH,
    maxLength: PASSWORD_MAX_LENGTH,
    example: '1234567',
  })
  @IsString()
  public newPassword: string;
}
