import { ConflictException, Injectable } from '@nestjs/common';
import { Category } from '@taskforce/shared-types';
import { CategoryError } from './category.const';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from '@taskforce/core';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async create(dto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByName(dto.name);
    if (existingCategory) {
      throw new ConflictException(CategoryError.NameAlreadyExists);
    }

    const categoryEntity = new CategoryEntity({
      ...dto,
    });

    return this.categoryRepository.create(categoryEntity);
  }

  public async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  public async findById(categoryId: number): Promise<Category | null> {
    return this.categoryRepository.findById(categoryId);
  }
}
