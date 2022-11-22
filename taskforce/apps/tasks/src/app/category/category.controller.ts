import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRdo } from './rdo/category.rdo';

@ApiTags('tasks')
@Controller('tasks')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('category')
  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatus.CREATED,
    description: 'Category was successfully created'
  })
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.create(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @ApiResponse({
    type: CategoryRdo,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('category')
  async showAll() {
    return fillObject(CategoryRdo, await this.categoryService.findAll());
  }
}
