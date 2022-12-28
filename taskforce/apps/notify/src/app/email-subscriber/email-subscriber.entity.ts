import { AbstractEntity } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';

export class EmailSubscriberEntity
  extends AbstractEntity
  implements Subscriber
{
  public id?: string;
  public email: string;
  public name: string;
  public userId: string;

  constructor(data: Subscriber) {
    super();

    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.userId = data.userId;
  }
}
