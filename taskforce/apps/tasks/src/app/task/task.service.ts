import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '@taskforce/shared-types';
import { ChangeTaskStatusDto } from './dto/change-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repository/task.repository';
import { TASK_NOT_FOUND_ERROR } from './task.const';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(customerId: string, dto: CreateTaskDto): Promise<Task> {
    const taskEntity = new TaskEntity({
      ...dto,
      status: TaskStatus.New,
      customer: customerId,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      comments: [],
      responses: [],
    });

    return this.taskRepository.create(taskEntity);
  }

  async getTask(id: number): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return existingTask;
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    const taskEntity = new TaskEntity({
      ...existingTask,
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : existingTask.dueDate,
    });

    return this.taskRepository.update(id, taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return this.taskRepository.destroy(id);
  }

  async findNew(): Promise<Task[]> {
    return this.taskRepository.findNew();
  }

  async findByCustomer(id: string): Promise<Task[]> {
    return this.taskRepository.findByCustomer(id);
  }

  async findByContractor(id: string): Promise<Task[]> {
    return this.taskRepository.findByContractor(id);
  }

  async changeTaskStatus(id: number, dto: ChangeTaskStatusDto): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    const taskEntity = new TaskEntity({
      ...existingTask,
      ...dto,
    });

    return this.taskRepository.update(id, taskEntity);
  }
}
