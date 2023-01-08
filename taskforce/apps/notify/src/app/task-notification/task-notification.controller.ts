import { TaskNotificationService } from './task-notification.service';
import { EventPattern } from '@nestjs/microservices';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandEvent } from '@taskforce/shared-types';
import { CreateTaskNotificationDto } from './dto/create-task-notification.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('notify')
@Controller('notify')
export class TaskNotificationController {
  constructor(
    private readonly taskNotificationService: TaskNotificationService
  ) {}

  @EventPattern({ cmd: CommandEvent.AddTaskNotification })
  public async create(taskNotification: CreateTaskNotificationDto) {
    return this.taskNotificationService.addNotification(taskNotification);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Sends new tasks mail notifications to all subscribers',
  })
  @ApiOkResponse({
    description: 'Notifications were sent',
  })
  async notifyNewTasks() {
    return this.taskNotificationService.notifyNewTasks();
  }
}
