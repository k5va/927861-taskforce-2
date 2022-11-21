import { CRUDRepository } from '@taskforce/core';
import { Task, TaskStatus } from '@taskforce/shared-types';
import { TaskEntity } from '../task.entity';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskMemoryRepository implements CRUDRepository<TaskEntity, string, Task> {
  private repository: {[key: string]: Task} = {};

  public async create(item: TaskEntity): Promise<Task> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<Task> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskEntity): Promise<Task> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }

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
