import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiHeader,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { fillObject, GetUser, JwtAuthGuard } from '@taskforce/core';
import { TaskStatusService } from './task-status.service';
import { TaskRdo } from '../task/rdo/task.rdo';
import { TaskCommands, UserRole } from '@taskforce/shared-types';
import { ChangeTaskStatusDto } from './dto/change-task-status.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskStatusController {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  @Patch('task/:id/status')
  @ApiOperation({
    summary: `Updates task status by sending corresponding commands: ${Object.values(
      TaskCommands
    )}`,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: TaskRdo,
    description: 'Task status was successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Task with give id not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
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
