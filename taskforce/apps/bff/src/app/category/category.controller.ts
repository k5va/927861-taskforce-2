import {
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, CategoryRdo } from '@taskforce/core';

@ApiTags('tasks')
@Controller('tasks')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('category')
  @ApiOperation({ summary: 'Creates new category' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    type: CategoryRdo,
    description: 'Category was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiConflictResponse({
    description: 'Conflict',
  })
  async create(
    @Body() dto: CreateCategoryDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.categoryService.create(dto, authHeader);
  }

  @Get('category')
  @ApiOperation({ summary: 'Gets list of all categories' })
  @ApiOkResponse({
    type: CategoryRdo,
    isArray: true,
  })
  async showAll() {
    return this.categoryService.findAll();
  }
}
