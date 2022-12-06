import { AbstractEntity } from '@taskforce/core';
import { Category } from '@taskforce/shared-types';

export class CategoryEntity extends AbstractEntity implements Category {
  public id: number;
  public name: string;

  constructor(data: Category) {
    super();

    this.id = data.id;
    this.name = data.name;
  }
}
