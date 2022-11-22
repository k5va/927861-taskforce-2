import { AbstractEntity } from '@taskforce/core';
import { Category } from '@taskforce/shared-types';

export class CategoryEntity extends AbstractEntity implements Category {
  public _id: string;
  public name: string;

  constructor(data: Category) {
    super();

    this._id = data._id;
    this.name = data.name;
  }
}
