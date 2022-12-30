export interface TaskNotification {
  _id?: string;
  title: string;
  price?: number;
  dueDate?: Date;
  address?: string;
  taskId: number;
  notifyDate?: Date;
}
