import { Expose } from 'class-transformer';

export class CategoryResponse {
  @Expose({ name: '_id'})
  id: string;

  @Expose()
  name: string;
}
