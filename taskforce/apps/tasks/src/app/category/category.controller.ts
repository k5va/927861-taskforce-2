import { Body, Controller, Get, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponse } from './response/category.response';

@Controller('tasks')
export class CommentController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('category')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.create(dto);
    return fillObject(CategoryResponse, newCategory);
  }

  @Get('category')
  async showAll() {
    return this.categoryService.findAll();
  }
}
