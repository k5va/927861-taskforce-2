import { Expose } from 'class-transformer';

export class ResponseRdo {
  @Expose({ name: '_id'})
  id: string;

  @Expose()
  contractor: string;
}
