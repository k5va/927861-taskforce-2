import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public async notifyNewTasks(): Promise<number> {
    this.logger.debug(`notifyNewTasks`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<number>(`${this.configService.get('services.notify')}`)
        .pipe(catchError(this.handleError))
    );

    return data;
  }

  private handleError = (error: AxiosError) => {
    this.logger.error(error.response.data);
    throw new HttpException(error.response.data, error.response.status);
  };
}
