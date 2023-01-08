import { Injectable } from '@nestjs/common';
import { TaskNotificationEntity } from './task-notification.entity';
import { TaskNotificationRepository } from './task-notification.repository';
import { CreateTaskNotificationDto } from './dto/create-task-notification.dto';
import { SenderService } from '../sender/sender.service';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';

@Injectable()
export class TaskNotificationService {
  constructor(
    private readonly taskNotificationRepository: TaskNotificationRepository,
    private readonly emailSubscriberService: EmailSubscriberService,
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

  public async notifyNewTasks(): Promise<number> {
    // get tasks notifications from repository
    const taskNotifications =
      await this.taskNotificationRepository.findNotNotified();
    if (taskNotifications.length === 0) {
      return 0;
    }

    // get contractor subscribers
    const subscribers = await this.emailSubscriberService.getAllContractors();

    // send notifications to subscribers
    await this.senderService.sendNotifyNewTasks(subscribers, taskNotifications);

    // update tasks notifications notifyDate
    const iDs = taskNotifications.map(({ _id }) => _id);
    await this.taskNotificationRepository.updateNotifyDate(iDs, new Date());

    return taskNotifications.length;
  }
}
