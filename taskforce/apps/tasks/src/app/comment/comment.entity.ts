import { AbstractEntity } from '@taskforce/core';
import { Comment } from '@taskforce/shared-types';

export class CommentEntity extends AbstractEntity implements Comment {
  public id?: number;
  public text: string;
  public taskId: number;
  public author: string;
  public registerDate?: Date;

  constructor(data: Comment) {
    super();

    this.id = data.id;
    this.text = data.text;
    this.taskId = data.taskId;
    this.author = data.author;
    this.registerDate = data.registerDate;
  }
}
