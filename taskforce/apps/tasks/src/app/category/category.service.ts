import { Injectable } from '@nestjs/common';
import { Category } from '@taskforce/shared-types';
import { CATEGORY_ALREADY_EXISTS } from './category.const';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryMemoryRepository } from './repository/category-memory.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryMemoryRepository) {}

  public async create(dto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByName(dto.name);
    if (existingCategory) {
      throw new Error(CATEGORY_ALREADY_EXISTS);
    }

    const categoryEntity = new CategoryEntity({
      ...dto,
      _id: '',
    });

    return this.categoryRepository.create(categoryEntity);
  }

  public async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}