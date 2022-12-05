import { CRUDRepository } from '@taskforce/core';
import { Category } from '@taskforce/shared-types';
import { CategoryEntity } from '../category.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryRepository
  implements CRUDRepository<CategoryEntity, number, Category>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CategoryEntity): Promise<Category> {
    const entityData = item.toObject();
    return this.prisma.category.create({
      data: {
        ...entityData,
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  public findById(id: number): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        id,
      },
    });
  }

  public findByName(name: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        name,
      },
    });
  }

  public findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  public update(id: number, item: CategoryEntity): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: { ...item.toObject(), id },
    });
  }
}
