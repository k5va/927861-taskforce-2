import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryMemoryRepository } from './repository/category-memory.repository';

@Module({
  providers: [CategoryMemoryRepository, CategoryService],
  exports: [CategoryService],
})
export class CommentModule {}
