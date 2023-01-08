import { IsISO8601, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskNotificationDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsISO8601()
  dueDate?: string;

  @IsOptional()
  @IsNotEmpty()
  address?: string;

  @IsNumber()
  taskId: number;
}
