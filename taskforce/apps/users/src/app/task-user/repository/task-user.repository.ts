import { CRUDRepository } from '@taskforce/core';
import { User } from '@taskforce/shared-types';
import { TaskUserEntity } from '../task-user.entity';
import { TaskUserModel } from '../task-user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskUserRepository
  implements CRUDRepository<TaskUserEntity, string, User>
{
  constructor(
    @InjectModel(TaskUserModel.name)
    private readonly taskUserModel: Model<TaskUserModel>
  ) {}

  public async create(item: TaskUserEntity): Promise<User> {
    const newUser = new this.taskUserModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.taskUserModel.findByIdAndDelete(id);
  }

  public async findById(id: string): Promise<User | null> {
    return this.taskUserModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.taskUserModel.findOne({ email }).exec();
  }

  public async update(
    id: string,
    data: Partial<TaskUserEntity>
  ): Promise<User> {
    return this.taskUserModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
