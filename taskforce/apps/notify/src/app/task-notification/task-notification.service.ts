import { Injectable } from '@nestjs/common';
import { TaskNotificationEntity } from './task-notification.entity';
import { TaskNotificationRepository } from './task-notification.repository';
import { CreateTaskNotificationDto } from './dto/create-task-notification.dto';
import { SenderService } from '../sender/sender.service';

@Injectable()
export class TaskNotificationService {
  constructor(
    private readonly taskNotificationRepository: TaskNotificationRepository,
    private readonly senderService: SenderService
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

  public async notifyNewTasks() {
    // get tasks notifications from repository
    const taskNotifications =
      await this.taskNotificationRepository.findNotNotified();
    if (taskNotifications.length === 0) {
      return 0;
    }

    // send mail to subscribers
    this.senderService.sendNotifyNewTasks(
      taskNotifications.map((data) => new TaskNotificationEntity(data))
    );

    // update tasks notifications notifyDate
    const iDs = taskNotifications.map(({ id }) => id);
    await this.taskNotificationRepository.updateNotifyDate(iDs, new Date());

    return iDs.length;
  }
}
