import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  fillObject,
  GetUser,
  JwtAuthGuard,
  Roles,
  RolesGuard,
} from '@taskforce/core';
import { UserRole, UserRoles } from '@taskforce/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';
import { PersonalTaskQuery, TaskQuery } from './query';
import { FileInterceptor } from '@nestjs/platform-express';
import { MAX_TASK_IMAGE_SIZE, TASK_IMAGE_FILE_TYPE } from './task.const';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('task')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'Task was successfully created',
  })
  @Roles(UserRoles.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(@GetUser('id') userId: string, @Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.create(userId, dto);
    return fillObject(TaskRdo, newTask);
  }

  @Get('task/:id')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with give id not found',
  })
  async show(@Param('id') id: number) {
    const task = await this.taskService.getTask(id);
    return fillObject(TaskRdo, task);
  }

  @Patch('task/:id')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with give id not found',
  })
  @Roles(UserRoles.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async update(
    @GetUser('id') userId: string,
    @Param('id') taskId: number,
    @Body() dto: UpdateTaskDto
  ) {
    const updatedTask = await this.taskService.updateTask(userId, taskId, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @Delete('task/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Task successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with give id not found',
  })
  @Roles(UserRoles.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async deleteTask(@GetUser('id') userId: string, @Param('id') taskId: number) {
    return this.taskService.deleteTask(userId, taskId);
  }

  @Get('new')
  @ApiResponse({
    type: TaskRdo,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Roles(UserRoles.Contractor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async showNew(@Query() query: TaskQuery) {
    return fillObject(TaskRdo, await this.taskService.findNew(query));
  }

  @Get('personal')
  @ApiResponse({
    type: TaskRdo,
    isArray: true,
    status: HttpStatus.OK,
  })
  @UseGuards(JwtAuthGuard)
  async showPersonal(
    @GetUser('id') userId: string,
    @GetUser('role') userRole: UserRole,
    @Query() query: PersonalTaskQuery
  ) {
    return userRole === UserRoles.Customer
      ? fillObject(
          TaskRdo,
          await this.taskService.findByCustomer(userId, query)
        )
      : fillObject(
          TaskRdo,
          await this.taskService.findByContractor(userId, query)
        );
  }

  @Post('task/:id/image')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task image was sussessfully uploaded',
  })
  @UseInterceptors(FileInterceptor('image'))
  @Roles(UserRoles.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async uploadImage(
    @GetUser('id') userId: string,
    @Param('id') taskId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_TASK_IMAGE_SIZE }),
          new FileTypeValidator({ fileType: TASK_IMAGE_FILE_TYPE }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const updatedTask = await this.taskService.setImage(
      userId,
      taskId,
      file.filename
    );
    return fillObject(TaskRdo, updatedTask);
  }
}
