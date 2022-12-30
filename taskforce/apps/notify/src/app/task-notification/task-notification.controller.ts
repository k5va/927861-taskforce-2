import { TaskNotificationService } from './task-notification.service';
import { EventPattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { CommandEvent } from '@taskforce/shared-types';
import { CreateTaskNotificationDto } from './dto/create-task-notification.dto';

@Controller()
export class TaskNotificationController {
  constructor(
    private readonly taskNotificationService: TaskNotificationService
  ) {}

  @EventPattern({ cmd: CommandEvent.AddTaskNotification })
  public async create(taskNotification: CreateTaskNotificationDto) {
    return this.taskNotificationService.addNotification(taskNotification);
  }
}
