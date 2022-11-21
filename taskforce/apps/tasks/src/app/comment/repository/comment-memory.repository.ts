import { Comment } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../comment.entity';
import { AbstractMemoryRepository } from '@taskforce/core';

@Injectable()
export class CommentMemoryRepository extends AbstractMemoryRepository<CommentEntity, Comment> {
  public async destroyByTaskId(taskId: string): Promise<void> {
    return Object
      .values(this.repository)
      .filter(({task}) => task === taskId)
      .forEach(({_id}) => this.destroy(_id));
  }
}
