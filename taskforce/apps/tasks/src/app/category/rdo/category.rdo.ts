import { Expose } from 'class-transformer';

export class CategoryRdo {
  @Expose({ name: '_id'})
  id: string;

  @Expose()
  name: string;
}
