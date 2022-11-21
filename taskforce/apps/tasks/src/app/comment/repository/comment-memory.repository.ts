import { CRUDRepository } from '@taskforce/core';
import { Comment } from '@taskforce/shared-types';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../comment.entity';

@Injectable()
export class CommentMemoryRepository implements CRUDRepository<CommentEntity, string, Comment> {
  private repository: {[key: string]: Comment} = {};

  public async create(item: CommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<Comment> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroyByTaskId(taskId: string): Promise<void> {
    return Object
      .values(this.repository)
      .filter(({task}) => task === taskId)
      .forEach(({_id}) => this.destroy(_id));
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
