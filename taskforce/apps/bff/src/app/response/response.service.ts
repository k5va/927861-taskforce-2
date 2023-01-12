import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from '@taskforce/shared-types';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ResponseService {
  private readonly logger = new Logger(ResponseService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public async create(taskId: string, authHeader: string): Promise<Response> {
    this.logger.debug(`createResponse to task ${taskId}`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<Response>(
          `${this.configService.get('services.tasks')}/task/${taskId}/response`,
          {},
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

  public async findAllByTask(taskId: string): Promise<Response[]> {
    this.logger.debug(`findAllByTask ${taskId}`);

    const { data } = await firstValueFrom(
      this.httpService
        .get<Response[]>(
          `${this.configService.get('services.tasks')}/task/${taskId}/response`,
          {}
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
