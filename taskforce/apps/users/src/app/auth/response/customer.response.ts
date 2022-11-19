import { Expose } from 'class-transformer';

export class CustomerResponse {
  @Expose({ name: '_id'})
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  registerDate: string;

  @Expose()
  city: string;

  @Expose()
  description: string;

  @Expose()
  role: string;

  @Expose()
  publishedTasks: number;

  @Expose()
  newTasks: number;
}
