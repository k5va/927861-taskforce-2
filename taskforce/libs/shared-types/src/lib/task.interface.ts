import { TaskStatus } from './task-status.enum';

export interface Task {
  title: string;
  description: string;
  category: string;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  customer: string;
  registerDate?: Date;
  status: TaskStatus;
  contractor?: string;
}
