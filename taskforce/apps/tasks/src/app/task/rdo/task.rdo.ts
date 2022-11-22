import { TaskStatus } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class TaskRdo {
  @Expose({ name: '_id'})
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  registerDate: string;

  @Expose()
  status: TaskStatus;

  @Expose()
  category: string;

  @Expose()
  price: number;

  @Expose()
  dueDate: Date;

  @Expose()
  image: string;

  @Expose()
  address: string;

  @Expose()
  tags: string[];

  @Expose()
  customer: string;
}
