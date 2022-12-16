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
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzljMTFhMGQ0NTFjZjA0NjBkNWJkMzgiLCJlbWFpbCI6InVzZXIxQG5vdGZvdW5kLmxvY2FsIiwicm9sZSI6IkN1c3RvbWVyIiwibmFtZSI6Iktla3MiLCJpYXQiOjE2NzExNzI1NzgsImV4cCI6MTY3MTc3NzM3OH0.KgsnlQa45nWlaCmqTqM5q9mmz3jYTTem5kdIvpqcVMQ',
  })
  @Expose()
  token: string;

  @ApiProperty({
    description: 'Refresh token',
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzljMTFhMGQ0NTFjZjA0NjBkNWJkMzgiLCJlbWFpbCI6InVzZXIxQG5vdGZvdW5kLmxvY2FsIiwicm9sZSI6IkN1c3RvbWVyIiwibmFtZSI6Iktla3MiLCJpYXQiOjE2NzExNzI1NzgsImV4cCI6MTY3MTc3NzM3OH0.KgsnlQa45nWlaCmqTqM5q9mmz3jYTTem5kdIvpqcVMQ',
  })
  @Expose()
  refreshToken: string;
}
