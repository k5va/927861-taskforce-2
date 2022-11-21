import { Category } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../category.entity';
import { AbstractMemoryRepository } from '@taskforce/core';

@Injectable()
export class CategoryMemoryRepository extends AbstractMemoryRepository<CategoryEntity, Category> {
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
}
