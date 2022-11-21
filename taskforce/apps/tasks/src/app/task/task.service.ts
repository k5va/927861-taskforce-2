import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '@taskforce/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskMemoryRepository } from './repository/task-memory.repository';
import { TASK_NOT_FOUND_ERROR } from './task.const';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskMemoryRepository) {}

  async create(customerId: string, dto: CreateTaskDto): Promise<Task> {
    const taskEntity = new TaskEntity({
      ...dto,
      _id: '',
      status: TaskStatus.New,
      customer: customerId,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      registerDate: new Date(),
    });

    return this.taskRepository.create(taskEntity);
  }

  async getTask(id: string): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    const userEntity = new TaskEntity({
      ...existingTask,
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : existingTask.dueDate,
    });

    return this.taskRepository.update(id, userEntity);
  }

  async deleteTask(id: string): Promise<void> {
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
}
