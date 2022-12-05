import { Comment } from './comment.interface';
import { Response } from './response.interface';

export interface Task {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  customer: string;
  registerDate?: Date;
  status: string;
  contractor?: string;
  comments: Comment[];
  responses: Response[];
}
