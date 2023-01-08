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
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { fillObject, JwtAuthGuard, Roles, RolesGuard } from '@taskforce/core';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRdo } from './rdo/category.rdo';
import { UserRoles } from '@taskforce/shared-types';

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
  @Roles(UserRoles.Customer)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.create(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @Get('category')
  @ApiOperation({ summary: 'Gets list of all categories' })
  @ApiOkResponse({
    type: CategoryRdo,
    isArray: true,
  })
  async showAll() {
    return fillObject(CategoryRdo, await this.categoryService.findAll());
  }
}
