import { Expose } from 'class-transformer';

export class CommentResponse {
  @Expose({ name: '_id'})
  id: string;

  @Expose()
  text: string;

  @Expose()
  author: string;

  @Expose()
  task: string;

  @Expose()
  registerDate: string;
}
