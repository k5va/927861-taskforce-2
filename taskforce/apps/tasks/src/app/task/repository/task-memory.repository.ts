import { AbstractMemoryRepository } from '@taskforce/core';
import { Task, TaskStatus } from '@taskforce/shared-types';
import { TaskEntity } from '../task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskMemoryRepository extends AbstractMemoryRepository<TaskEntity, Task> {
  public async findNew(): Promise<Task[]> {
    return Object
      .values(this.repository)
      .filter(({status}) => status === TaskStatus.New);
  }

  public async findByCustomer(id: string): Promise<Task[]> {
    return Object
      .values(this.repository)
      .filter(({customer}) => customer === id);
  }

  public async findByContractor(id: string): Promise<Task[]> {
    return Object
      .values(this.repository)
      .filter(({contractor}) => contractor === id);
  }
}
