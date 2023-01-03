import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRoles } from '@taskforce/shared-types';
import { ChangeTaskStatusDto } from './dto/change-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';
import { PersonalTaskQuery, TaskQuery } from './query';

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
  async create(@Body() dto: CreateTaskDto) {
    const customerId = '123'; //TODO: temporary
    const newTask = await this.taskService.create(customerId, dto);
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
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.updateTask(id, dto);
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
  async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @Get('new')
  @ApiResponse({
    type: TaskRdo,
    isArray: true,
    status: HttpStatus.OK,
  })
  async showNew(@Query() query: TaskQuery) {
    return fillObject(TaskRdo, this.taskService.findNew(query));
  }

  @Get('personal')
  @ApiResponse({
    type: TaskRdo,
    isArray: true,
    status: HttpStatus.OK,
  })
  async showPersonal(@Query() query: PersonalTaskQuery) {
    const userId = '123'; // TODO: temporary
    const userRole = UserRoles.Customer;

    return userRole === UserRoles.Customer
      ? fillObject(TaskRdo, this.taskService.findByCustomer(userId, query))
      : fillObject(TaskRdo, this.taskService.findByContractor(userId, query));
  }

  @Patch('task/:id/status')
  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task status successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with give id not found',
  })
  async changeTaskStatus(
    @Param('id') id: number,
    @Body() dto: ChangeTaskStatusDto
  ) {
    const updatedTask = await this.taskService.changeTaskStatus(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }
}
