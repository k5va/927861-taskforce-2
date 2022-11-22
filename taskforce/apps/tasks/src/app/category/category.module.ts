import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryMemoryRepository } from './repository/category-memory.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryMemoryRepository, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
