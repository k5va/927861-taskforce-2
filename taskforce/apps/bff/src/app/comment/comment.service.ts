import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Comment } from '@taskforce/shared-types';
import { CreateCommentDto } from '@taskforce/core';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public async create(
    taskId: string,
    dto: CreateCommentDto,
    authHeader: string
  ): Promise<Comment> {
    this.logger.debug(`createComment for task ${taskId}`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<Comment>(
          `${this.configService.get('services.tasks')}/task/${taskId}/comment`,
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

  public async deleteComment(
    taskId: string,
    commentId: string,
    authHeader: string
  ): Promise<void> {
    this.logger.debug(`deleteComment ${commentId}`);

    await firstValueFrom(
      this.httpService
        .delete<Comment>(
          `${this.configService.get(
            'services.tasks'
          )}/task/${taskId}/comment/${commentId}`,
          {
            headers: {
              authorization: authHeader,
            },
          }
        )
        .pipe(catchError(this.handleError))
    );
  }

  public async findByTask(taskId: string, query: string): Promise<Comment[]> {
    this.logger.debug(`findByTask ${taskId}`);

    const { data } = await firstValueFrom(
      this.httpService
        .get<Comment[]>(
          `${this.configService.get('services.tasks')}/task/${taskId}/comment${
            query ? `?${query}` : ''
          }`
        )
        .pipe(catchError(this.handleError))
    );

    return data;
  }

  private handleError = (error: AxiosError) => {
    this.logger.error(error.response.data);
    throw new InternalServerErrorException(error.response.data, {
      cause: error,
    });
  };
}
