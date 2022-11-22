import { AbstractEntity } from '@taskforce/core';
import { Response } from '@taskforce/shared-types';

export class ResponseEntity extends AbstractEntity implements Response {
  public _id: string;
  public contractor: string;
  public task: string;

  constructor(data: Response) {
    super();

    this._id = data._id;
    this.contractor = data.contractor;
    this.task = data.task;
  }
}
