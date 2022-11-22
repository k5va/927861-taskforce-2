import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'old password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: '123456',
  })
  public oldPassword: string;

  @ApiProperty({
    description: 'new password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: '1234567',
  })
  public newPassword: string;
}
