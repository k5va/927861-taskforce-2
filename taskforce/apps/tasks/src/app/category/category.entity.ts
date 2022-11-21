import { Category } from '@taskforce/shared-types';

export class CategoryEntity implements Category {
  public _id: string;
  public name: string;

  constructor(data: Category) {
    this._id = data._id;
    this.name = data.name;
  }

  public toObject() {
    return {...this};
  }
}
