import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Headers,
  Logger,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  ChangePasswordDto,
} from '@taskforce/core';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { Task } from '@taskforce/shared-types';

@Controller('tasks')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get('/task/:taskId')
  getTask(@Param('taskId') taskId: string): Observable<Task> {
    return this.appService.getTask(taskId);
  }

  @Get('/task/:taskId/comment')
  async getTaskComments(@Param('taskId') taskId: string) {
    return this.appService.getTaskComments(taskId);
  }

  @Post('/user')
  async createUser(@Body() dto: CreateUserDto) {
    return this.appService.createUser(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    return this.appService.login(dto);
  }

  @Put('/user/:id/password')
  async changePassword(
    @Headers('authorization') authHeader: string,
    @Param('id') userId: string,
    @Body() dto: ChangePasswordDto
  ) {
    this.logger.debug(authHeader);
    return this.appService.changePassword(userId, dto, authHeader);
  }

  @Post('/user/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file,
    @Headers('authorization') authHeader: string
  ) {
    this.logger.debug(authHeader);
    return this.appService.uploadAvatar(authHeader, file);
  }

  @Get('/user/:userId')
  async getUser(@Param('userId') userId: string) {
    return this.appService.getUser(userId);
  }

  @Get('/new')
  async getNewTasks(@Headers('authorization') authHeader: string) {
    this.logger.debug(authHeader);
    return this.appService.getNewTasks(authHeader);
  }
}
