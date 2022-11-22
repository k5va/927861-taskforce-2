import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Unique email',
    required: true,
    example: 'keks@mail.no',
  })
  public email: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    minLength: 6,
    maxLength: 12,
    example: '123456',
  })
  public password: string;
}
