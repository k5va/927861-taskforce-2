import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Category, UserRole, UserRoles } from '@taskforce/shared-types';
import { CATEGORY_ALREADY_EXISTS } from './category.const';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async create(dto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByName(dto.name);
    if (existingCategory) {
      throw new Error(CATEGORY_ALREADY_EXISTS);
    }

    const categoryEntity = new CategoryEntity({
      ...dto,
    });

    return this.categoryRepository.create(categoryEntity);
  }

  public async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
