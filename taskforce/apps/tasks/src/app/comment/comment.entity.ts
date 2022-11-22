import { AbstractEntity } from '@taskforce/core';
import { Comment } from '@taskforce/shared-types';

export class CommentEntity extends AbstractEntity implements Comment {
  public _id: string;
  public text: string;
  public task: string;
  public author: string;
  public rergisterDate?: Date;

  constructor(data: Comment) {
    super();

    this._id = data._id;
    this.text = data.text;
    this.task = data.task;
    this.author = data.author;
    this.rergisterDate = data.rergisterDate;
  }
}
