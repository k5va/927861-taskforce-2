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
import { Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseRdo } from '@taskforce/core';

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
  async create(
    @Param('id') taskId: string,
    @Headers('authorization') authHeader: string
  ) {
    return this.responseService.create(taskId, authHeader);
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
  async showAll(@Param('id') taskId: string) {
    return this.responseService.findAllByTask(taskId);
  }
}
