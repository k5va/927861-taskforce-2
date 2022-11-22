import { Expose } from 'class-transformer';

export class LoggedInUserRdo {
  @Expose({ name: '_id'})
  id: string;

  @Expose()
  email: string;

  @Expose()
  token: string;
}
