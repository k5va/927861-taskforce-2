import { Expose } from 'class-transformer';

export class ContractorResponse {
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
  age: string;

  @Expose()
  rating: number;

  @Expose()
  placeInRating: number;

  @Expose()
  CompletedTasks: number;

  @Expose()
  failedTasks: number;

  @Expose()
  skills: number;
}
