import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CommandEvent,
  Task,
  TaskNotification,
  TaskStatuses,
} from '@taskforce/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery, PersonalTaskQuery } from './query';
import { TaskRepository } from './repository/task.repository';
import { RABBITMQ_SERVICE, TASK_NOT_FOUND_ERROR } from './task.const';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  async create(customerId: string, dto: CreateTaskDto): Promise<Task> {
    const taskEntity = new TaskEntity({
      ...dto,
      status: TaskStatuses.New,
      customer: customerId,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      comments: [],
      responses: [],
    });

    const newTask = await this.taskRepository.create(taskEntity);

    // send task notification event
    this.rabbitClient.emit<void, TaskNotification>(
      { cmd: CommandEvent.AddTaskNotification },
      {
        title: newTask.title,
        price: newTask.price,
        dueDate: newTask.dueDate,
        address: newTask.address,
        taskId: newTask.id,
      }
    );

    return newTask;
  }

  async getTask(id: number): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);

    if (!existingTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return existingTask;
  }

  async updateTask(
    userId: string,
    taskId: number,
    dto: UpdateTaskDto
  ): Promise<Task> {
    const existingTask = await this.getTask(taskId);

    this.validateTaskOwner(existingTask, userId);

    return this.taskRepository.update(taskId, {
      ...dto,
      dueDate: dto.dueDate && new Date(dto.dueDate),
    });
  }

  async setImage(
    userId: string,
    taskId: number,
    fileName: string
  ): Promise<Task> {
    const existingTask = await this.getTask(taskId);

    this.validateTaskOwner(existingTask, userId);

    return this.taskRepository.update(taskId, {
      image: fileName,
    });
  }

  async deleteTask(userId: string, taskId: number): Promise<void> {
    const existingTask = await this.getTask(taskId);
    this.validateTaskOwner(existingTask, userId);

    return this.taskRepository.destroy(taskId);
  }

  async findNew(query: TaskQuery): Promise<Task[]> {
    return this.taskRepository.findNew(query);
  }

  async findByCustomer(id: string, query: PersonalTaskQuery): Promise<Task[]> {
    return this.taskRepository.findByCustomer(id, query);
  }

  async findByContractor(
    id: string,
    query: PersonalTaskQuery
  ): Promise<Task[]> {
    return this.taskRepository.findByContractor(id, query);
  }

  private validateTaskOwner(task: Task, customer: string) {
    if (task.customer !== customer) {
      throw new UnauthorizedException();
    }
  }
}
