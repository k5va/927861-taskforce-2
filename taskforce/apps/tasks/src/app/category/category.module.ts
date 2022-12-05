import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
