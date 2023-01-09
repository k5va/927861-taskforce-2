import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [HttpModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
