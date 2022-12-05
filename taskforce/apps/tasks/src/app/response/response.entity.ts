import { AbstractEntity } from '@taskforce/core';
import { Response } from '@taskforce/shared-types';

export class ResponseEntity extends AbstractEntity implements Response {
  public id: number;
  public contractor: string;
  public taskId: number;

  constructor(data: Response) {
    super();

    this.id = data.id;
    this.taskId = data.taskId;
    this.contractor = data.contractor;
  }
}
