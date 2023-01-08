import {
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  fillObject,
  GetUser,
  JwtAuthGuard,
  Roles,
  RolesGuard,
} from '@taskforce/core';
import { ResponseService } from './response.service';
import { ResponseRdo } from './rdo/response.rdo';
import { UserRoles } from '@taskforce/shared-types';

@ApiTags('tasks')
@Controller('tasks')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post('task/:id/response')
  @ApiOperation({ summary: 'Creates new customer response to Task' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    type: ResponseRdo,
    description: 'Response was successfully created',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiConflictResponse({
    description: 'Contractor response to task already exists',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @Roles(UserRoles.Contractor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(@GetUser('id') userId: string, @Param('id') taskId: number) {
    const newResponse = await this.responseService.create(userId, taskId);
    return fillObject(ResponseRdo, newResponse);
  }

  @Get('task/:id/response')
  @ApiOperation({ summary: 'Gets all contractor responses to task' })
  @ApiOkResponse({
    type: ResponseRdo,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  async showAll(@Param('id') taskId: number) {
    return fillObject(
      ResponseRdo,
      await this.responseService.findAllByTask(taskId)
    );
  }
}
