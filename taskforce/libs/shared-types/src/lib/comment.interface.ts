export interface Comment {
  id?: number;
  text: string;
  taskId: number;
  author: string;
  registerDate?: Date;
}
