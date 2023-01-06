import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { fillObject, GetUser, JwtAuthGuard } from '@taskforce/core';
import { TaskStatusService } from './task-status.service';
import { TaskRdo } from '../task/rdo/task.rdo';
import { UserRole } from '@taskforce/shared-types';
import { ChangeTaskStatusDto } from './dto/change-task-status.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskStatusController {
  constructor(private readonly taskStatusService: TaskStatusService) {}

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
  @UseGuards(JwtAuthGuard)
  async changeTaskStatus(
    @GetUser('id') userId: string,
    @GetUser('role') userRole: UserRole,
    @Param('id') taskId: number,
    @Body() dto: ChangeTaskStatusDto
  ) {
    const updatedTask = await this.taskStatusService.changeTaskStatus(
      userId,
      userRole,
      taskId,
      dto
    );
    return fillObject(TaskRdo, updatedTask);
  }
}
