export interface Review {
  id?: number;
  text: string;
  customer: string;
  contractor: string;
  rating: number;
  taskId: number;
  registerDate?: Date;
}
