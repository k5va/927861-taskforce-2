import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Task, Comment, User, UserRoles } from '@taskforce/shared-types';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import { AxiosError } from 'axios';
import { CreateUserDto } from 'apps/users/src/app/auth/dto/create-user.dto';
import { LoginUserDto } from 'apps/users/src/app/auth/dto/login-user.dto';
import { ChangePasswordDto } from 'apps/users/src/app/auth/dto/change-password.dto';
import * as FormData from 'form-data';

const TASKS_SERVICE_URL = 'http://localhost:3335/api/tasks';
const USERS_SERVICE_URL = 'http://localhost:3334/api/auth';

const errorHandler = <T>() =>
  catchError<T, never>((error: AxiosError) => {
    throw new HttpException(error.response.data, error.response.status);
  });

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}

  getTask(taskId: string): Observable<Task> {
    const data = this.httpService
      .get<Task>(`${TASKS_SERVICE_URL}/task/${taskId}`)
      .pipe(map((response) => response.data))
      .pipe(errorHandler());

    return data;
  }

  async getTaskComments(taskId: string): Promise<Comment[]> {
    const { data: comments } = await firstValueFrom(
      this.httpService
        .get<Comment[]>(`${TASKS_SERVICE_URL}/task/${taskId}/comment`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new HttpException(error.response.data, error.response.status);
          })
        )
    );

    return comments;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.post<User>(`${USERS_SERVICE_URL}/user`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw new HttpException(error.response.data, error.response.status);
        })
      )
    );

    return data;
  }

  async login(dto: LoginUserDto): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.post<User>(`${USERS_SERVICE_URL}/login`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw new HttpException(error.response.data, error.response.status);
        })
      )
    );

    return data;
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
    authHeader: string
  ): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService
        .put<User>(`${USERS_SERVICE_URL}/user/${userId}/password`, dto, {
          headers: {
            authorization: authHeader,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw new HttpException(error.response.data, error.response.status);
          })
        )
    );

    return data;
  }

  async uploadAvatar(authHeader: string, file: any): Promise<User> {
    const form = new FormData();

    form.append('avatar', file.buffer, file.originalname);

    const { data } = await firstValueFrom(
      this.httpService
        .post<User>(`${USERS_SERVICE_URL}/avatar`, form, {
          headers: {
            ...form.getHeaders(),
            authorization: authHeader,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw new HttpException(error.response.data, error.response.status);
          })
        )
    );

    return data;
  }

  async getUser(userId: string): Promise<User> {
    const { data: user } = await firstValueFrom(
      this.httpService.get<User>(`${USERS_SERVICE_URL}/user/${userId}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(error.response.data, error.response.status);
        })
      )
    );

    const { data: customer } = await firstValueFrom(
      this.httpService
        .get<{ publishedTasksCount: number; newTasksCount: number }>(
          `${TASKS_SERVICE_URL}/customer/${userId}`
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new HttpException(error.response.data, error.response.status);
          })
        )
    );

    return { ...user, ...customer };
  }

  async getNewTasks(authHeader: string): Promise<Task[]> {
    const { data: tasks } = await firstValueFrom(
      this.httpService
        .get<Task[]>(`${TASKS_SERVICE_URL}/new`, {
          headers: {
            authorization: authHeader,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new HttpException(error.response.data, error.response.status);
          })
        )
    );

    const augmentedTasks = tasks.map(async (task) => {
      const { data: customer } = await firstValueFrom(
        this.httpService
          .get<User>(`${USERS_SERVICE_URL}/user/${task.customer}`)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw new HttpException(
                error.response.data,
                error.response.status
              );
            })
          )
      );
      return {
        ...task,
        customerDetails: {
          id: customer._id,
          name: customer.name,
          email: customer.email,
        },
      };
    });

    return Promise.all(augmentedTasks);
  }
}
