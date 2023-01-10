import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedInUserRdo {
  @ApiProperty({
    description: 'User Id',
    required: true,
    example: '1282499d-5b42-4007-b103-a8b7f8f51835',
  })
  @Expose({ name: '_id' })
  @Type(() => String)
  id: string;

  @ApiProperty({
    description: 'Unique email',
    required: true,
    example: 'keks@mail.no',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Auth token',
    required: true,
  })
  @Expose()
  token: string;

  @ApiProperty({
    description: 'Refresh token',
    required: true,
  })
  @Expose()
  refreshToken: string;
}
