import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Review } from '@taskforce/shared-types';
import { CreateReviewDto } from '@taskforce/core';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public async create(
    taskId: string,
    dto: CreateReviewDto,
    authHeader: string
  ): Promise<Review> {
    this.logger.debug(`createReview to task ${taskId}`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<Review>(
          `${this.configService.get('services.tasks')}/task/${taskId}/review`,
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
}
