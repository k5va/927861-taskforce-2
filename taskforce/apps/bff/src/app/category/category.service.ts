import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Category } from '@taskforce/shared-types';
import { CreateCategoryDto } from '@taskforce/core';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public async create(
    dto: CreateCategoryDto,
    authHeader: string
  ): Promise<Category> {
    this.logger.debug(`createCategory ${dto.name}`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<Category>(
          `${this.configService.get('services.tasks')}/category`,
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

  public async findAll(): Promise<Category[]> {
    this.logger.debug(`findAll`);

    const { data } = await firstValueFrom(
      this.httpService
        .get<Category[]>(`${this.configService.get('services.tasks')}/category`)
        .pipe(catchError(this.handleError))
    );

    return data;
  }

  private handleError = (error: AxiosError) => {
    this.logger.error(error.response.data);
    throw new HttpException(error.response.data, error.response.status);
  };
}
