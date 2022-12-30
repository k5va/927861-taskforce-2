import { Injectable } from '@nestjs/common';
import { TaskNotificationEntity } from './task-notification.entity';
import { TaskNotificationRepository } from './task-notification.repository';
import { CreateTaskNotificationDto } from './dto/create-task-notification.dto';

@Injectable()
export class TaskNotificationService {
  constructor(
    private readonly taskNotificationRepository: TaskNotificationRepository
  ) {}

  public async addNotification(taskNotification: CreateTaskNotificationDto) {
    const newTaskNotification = await this.taskNotificationRepository.create(
      new TaskNotificationEntity({
        ...taskNotification,
        dueDate: taskNotification.dueDate
          ? new Date(taskNotification.dueDate)
          : undefined,
      })
    );

    return newTaskNotification;
  }
}
