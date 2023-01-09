import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoggedInUserRdo,
  LoginUserDto,
  TaskContractorRdo,
  TaskCustomerRdo,
  UpdateUserDto,
} from '@taskforce/core';
import { User, UserRoles } from '@taskforce/shared-types';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    this.logger.debug(`createUser`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<User>(`${this.configService.get('services.users')}/user`, dto)
        .pipe(catchError(this.handleError))
    );

    return data;
  }

  async getUser(userId: string): Promise<User> {
    this.logger.debug(`getUser ${userId}`);

    const { data: user } = await firstValueFrom(
      this.httpService
        .get<User>(`${this.configService.get('services.users')}/user/${userId}`)
        .pipe(catchError(this.handleError))
    );

    let fullUser = user;
    if (user.role === UserRoles.Customer) {
      const { data: customer } = await firstValueFrom(
        this.httpService
          .get<TaskCustomerRdo>(
            `${this.configService.get('services.tasks')}/customer/${userId}`
          )
          .pipe(catchError(this.handleError))
      );
      fullUser = { ...user, ...customer };
    }

    if (user.role === UserRoles.Contractor) {
      const { data: contractor } = await firstValueFrom(
        this.httpService
          .get<TaskContractorRdo>(
            `${this.configService.get('services.tasks')}/contractor/${userId}`
          )
          .pipe(catchError(this.handleError))
      );
      fullUser = { ...user, ...contractor };
    }

    return fullUser;
  }

  async updateUser(
    userId: string,
    dto: UpdateUserDto,
    authHeader: string
  ): Promise<User> {
    this.logger.debug(`updateUser ${userId}`);

    const { data: updatedUser } = await firstValueFrom(
      this.httpService
        .patch<User>(
          `${this.configService.get('services.users')}/user/${userId}`,
          dto,
          {
            headers: {
              authorization: authHeader,
            },
          }
        )
        .pipe(catchError(this.handleError))
    );

    return updatedUser;
  }

  async setAvatar(
    file: Express.Multer.File,
    authHeader: string
  ): Promise<User> {
    this.logger.debug(`setAvatar`);

    const form = new FormData();
    form.append('avatar', file.buffer, file.originalname);

    const { data: updatedUser } = await firstValueFrom(
      this.httpService
        .post<User>(
          `${this.configService.get('services.users')}/avatar`,
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

    return updatedUser;
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
    authHeader: string
  ): Promise<User> {
    this.logger.debug(`changePassword: ${userId}`);

    const { data } = await firstValueFrom(
      this.httpService
        .put<User>(
          `${this.configService.get('services.users')}/user/${userId}/password`,
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

  async loginUser(dto: LoginUserDto) {
    this.logger.debug(`loginUser: ${dto.email}`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<LoggedInUserRdo>(
          `${this.configService.get('services.users')}/login`,
          dto
        )
        .pipe(catchError(this.handleError))
    );

    return data;
  }

  async refreshToken(authHeader: string) {
    this.logger.debug(`refreshToken`);

    const { data } = await firstValueFrom(
      this.httpService
        .post<LoggedInUserRdo>(
          `${this.configService.get('services.users')}/refresh`,
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

  private handleError = (error: AxiosError) => {
    this.logger.error(error.response.data);
    throw new HttpException(error.response.data, error.response.status);
  };
}
