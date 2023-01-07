import { Injectable } from '@nestjs/common';
import { TaskStatuses } from '@taskforce/shared-types';
import { TaskRepository } from '../task/repository/task.repository';

@Injectable()
export class TaskCustomerService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async findByCustomerId(customer: string) {
    const publishedTasks = await this.taskRepository.findByCustomer(
      customer,
      {}
    );
    const newTasks = await this.taskRepository.findByCustomer(customer, {
      statuses: [TaskStatuses.New],
    });

    return {
      customer,
      publishedTasksCount: publishedTasks.length,
      newTasksCount: newTasks.length,
    };
  }
}
