import { Comment } from '@taskforce/shared-types';

export class CommentEntity implements Comment {
  public _id: string;
  public text: string;
  public task: string;
  public author: string;
  public rergisterDate?: Date;

  constructor(data: Comment) {
    this._id = data._id;
    this.text = data.text;
    this.task = data.task;
    this.author = data.author;
    this.rergisterDate = data.rergisterDate;
  }

  public toObject() {
    return {...this};
  }
}
