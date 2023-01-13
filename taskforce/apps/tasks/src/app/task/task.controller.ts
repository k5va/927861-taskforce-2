import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
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
  TaskImage,
} from '@taskforce/core';
import { UserRole, UserRoles } from '@taskforce/shared-types';
import { CreateTaskDto, UpdateTaskDto, TaskRdo } from '@taskforce/core';
import { TaskService } from './task.service';
import { PersonalTaskQuery, TaskQuery } from './query';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('task')
  @ApiOperation({ summary: 'Creates new task' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    type: TaskRdo,
    description: 'Task was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Roles(UserRoles.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(@GetUser('id') userId: string, @Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.create(userId, dto);
    return fillObject(TaskRdo, newTask);
  }

  @Get('task/:id')
  @ApiOperation({ summary: 'Gets task details by id' })
  @ApiOkResponse({
    type: TaskRdo,
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  async show(@Param('id') id: number) {
    const task = await this.taskService.getTask(id);
    return fillObject(TaskRdo, task);
  }

  @Patch('task/:id')
  @ApiOperation({ summary: 'Updates task' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: TaskRdo,
    description: 'Task successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
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
  @ApiOperation({ summary: 'Deletes task' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiNoContentResponse({
    description: 'Task successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Task with give id not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Roles(UserRoles.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async deleteTask(@GetUser('id') userId: string, @Param('id') taskId: number) {
    return this.taskService.deleteTask(userId, taskId);
  }

  @Get('new')
  @ApiOperation({ summary: 'gets new tasks' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: TaskRdo,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Roles(UserRoles.Contractor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async showNew(@Query() query: TaskQuery) {
    return fillObject(TaskRdo, await this.taskService.findNew(query));
  }

  @Get('personal')
  @ApiOperation({ summary: 'gets personal tasks' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: TaskRdo,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
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
  @ApiOperation({ summary: 'Uploads task image' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: TaskRdo,
    description: 'Task image was sussessfully uploaded',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
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
          new MaxFileSizeValidator({ maxSize: TaskImage.MaxSize }),
          new FileTypeValidator({ fileType: TaskImage.FileType }),
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
