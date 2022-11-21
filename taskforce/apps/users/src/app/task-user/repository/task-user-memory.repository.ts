import { User } from '@taskforce/shared-types';
import { TaskUserEntity } from '../task-user.entity';
import { Injectable } from '@nestjs/common';
import { AbstractMemoryRepository } from '@taskforce/core';

@Injectable()
export class TaskUserMemoryRepository extends AbstractMemoryRepository<TaskUserEntity, User> {
  public async findByEmail(email: string): Promise<User | null> {
    const existUser = Object.values(this.repository)
      .find((userItem) => userItem.email === email);

    if (! existUser) {
      return null;
    }

    return { ...existUser};
  }
}
