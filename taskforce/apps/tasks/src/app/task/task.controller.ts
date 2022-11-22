import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { ChangeTaskStatusDto } from './dto/change-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('task')
  async create(@Body() dto: CreateTaskDto) {
    const customerId = '';
    const newTask = await this.taskService.create(customerId, dto);
    return fillObject(TaskRdo, newTask);
  }

  @Get('task/:id')
  async show(@Param() id: string) {
    const task = await this.taskService.getTask(id);
    return fillObject(TaskRdo, task);
  }

  @Patch('task/:id')
  async update(@Param() id: string, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.updateTask(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @Delete('task/:id')
  async deleteTask(@Param() id: string) {
    return this.taskService.deleteTask(id);
  }

  @Get('new')
  async showNew() {
    return fillObject(TaskRdo, this.taskService.findNew());
  }

  @Get('personal')
  async showPersonal() {
    const userId = '';
    const userRole = UserRole.Customer;

    return userRole === UserRole.Customer
      ? fillObject(TaskRdo, this.taskService.findByCustomer(userId))
      : fillObject(TaskRdo, this.taskService.findByContractor(userId));
  }

  @Patch('task/:id/status')
  async changeTaskStatus(@Param() id: string, @Body() dto: ChangeTaskStatusDto) {
    const updatedTask = await this.taskService.changeTaskStatus(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }
}
