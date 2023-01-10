import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Task, User } from '@taskforce/shared-types';
import {
  ChangeTaskStatusDto,
  CreateTaskDto,
  UpdateTaskDto,
} from '@taskforce/core';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async createTask(dto: CreateTaskDto, authHeader: string): Promise<Task> {
    this.logger.debug(`createTask`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<Task>(`${this.configService.get('services.tasks')}/task`, dto, {
          headers: {
            authorization: authHeader,
          },
        })
        .pipe(catchError(this.handleError))
    );

    return data;
  }

  async getTask(taskId: string): Promise<Task> {
    this.logger.debug(`getTask: ${taskId}`);

    const { data: task } = await firstValueFrom(
      this.httpService
        .get<Task>(`${this.configService.get('services.tasks')}/task/${taskId}`)
        .pipe(catchError(this.handleError))
    );

    task.image = this.makeFullImageUrl(task.image);

    return task;
  }

  async updateTask(
    taskId: string,
    dto: UpdateTaskDto,
    authHeader: string
  ): Promise<Task> {
    this.logger.debug(`updateTask: ${taskId}`);

    const { data: task } = await firstValueFrom(
      this.httpService
        .patch<Task>(
          `${this.configService.get('services.tasks')}/task/${taskId}`,
          dto,
          {
            headers: {
              authorization: authHeader,
            },
          }
        )
        .pipe(catchError(this.handleError))
    );

    task.image = this.makeFullImageUrl(task.image);

    return task;
  }

  async setImage(
    taskId: string,
    file: Express.Multer.File,
    authHeader: string
  ): Promise<Task> {
    this.logger.debug(`setImage: ${taskId}`);

    const form = new FormData();
    form.append('image', file.buffer, file.originalname);

    const { data: updatedTask } = await firstValueFrom(
      this.httpService
        .post<Task>(
          `${this.configService.get('services.tasks')}/task/${taskId}/image`,
          form,
          {
            headers: {
              ...form.getHeaders(),
              authorization: authHeader,
            },
          }
        )
        .pipe(catchError(this.handleError))
    );

    updatedTask.image = this.makeFullImageUrl(updatedTask.image);

    return updatedTask;
  }

  async deleteTask(taskId: string, authHeader: string): Promise<void> {
    this.logger.debug(`deleteTask: ${taskId}`);

    await firstValueFrom(
      this.httpService
        .delete<Task>(
          `${this.configService.get('services.tasks')}/task/${taskId}`,
          {
            headers: {
              authorization: authHeader,
            },
          }
        )
        .pipe(catchError(this.handleError))
    );
  }

  async findNew(query: string, authHeader: string): Promise<Task[]> {
    this.logger.debug(`findNew: ${query}`);

    const { data: tasks } = await firstValueFrom(
      this.httpService
        .get<Task[]>(
          `${this.configService.get('services.tasks')}/new${
            query ? `?${query}` : ''
          }`,
          {
            headers: {
              authorization: authHeader,
            },
          }
        )
        .pipe(catchError(this.handleError))
    );

    const augmentedTasks = tasks.map(async (task) => {
      const { data: customer } = await firstValueFrom(
        this.httpService
          .get<User>(
            `${this.configService.get('services.users')}/user/${task.customer}`
          )
          .pipe(catchError(this.handleError))
      );
      return {
        ...task,
        image: this.makeFullImageUrl(task.image),
        customerName: customer.name,
        customerEmail: customer.email,
      };
    });

    return Promise.all(augmentedTasks);
  }

  async findPersonal(query: string, authHeader: string): Promise<Task[]> {
    this.logger.debug(`findPersonal: ${query}`);

    const { data: tasks } = await firstValueFrom(
      this.httpService
        .get<Task[]>(
          `${this.configService.get('services.tasks')}/personal${
            query ? `?${query}` : ''
          }`,
          {
            headers: {
              authorization: authHeader,
            },
          }
        )
        .pipe(catchError(this.handleError))
    );

    return tasks;
  }

  async changeTaskStatus(
    taskId: string,
    dto: ChangeTaskStatusDto,
    authHeader: string
  ): Promise<Task> {
    this.logger.debug(`changeTaskStatus: ${taskId}`);

    const { data } = await firstValueFrom(
      this.httpService
        .patch<Task>(
          `${this.configService.get('services.tasks')}/task/${taskId}/status`,
          dto,
          {
            headers: {
              authorization: authHeader,
            },
          }
        )
        .pipe(catchError(this.handleError))
    );

    return data;
  }

  private handleError = (error: AxiosError) => {
    this.logger.error(error.response.data);
    throw new HttpException(error.response.data, error.response.status);
  };

  private makeFullImageUrl(image: string): string {
    return image
      ? `${this.configService.get('services.tasksStatic')}/${image}`
      : undefined;
  }
}
