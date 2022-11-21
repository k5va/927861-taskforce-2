import { CRUDRepository } from '@taskforce/core';
import { Category } from '@taskforce/shared-types';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../category.entity';

@Injectable()
export class CategoryMemoryRepository implements CRUDRepository<CategoryEntity, string, Category> {
  private repository: {[key: string]: Category} = {};

  public async create(item: CategoryEntity): Promise<Category> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<Category> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByName(name: string): Promise<Category | null> {
    const existingCategory = Object.values(this.repository)
      .find((category) => category.name === name);

    if (!existingCategory) {
      return null;
    }

    return { ...existingCategory};
  }

  public async findAll(): Promise<Category[]> {
    return Object.values(this.repository);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: CategoryEntity): Promise<Category> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
