import { CRUDRepository } from '@taskforce/core';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractMemoryRepository<E extends {toObject: () => R}, R>
  implements CRUDRepository<E, string, R> {

  protected repository: {[key: string]: R} = {};

  public async create(item: E): Promise<R> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<R> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: E): Promise<R> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
