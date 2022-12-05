import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { ResponseService } from './response.service';
import { ResponseRdo } from './rdo/response.rdo';

@ApiTags('tasks')
@Controller('tasks')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post('task/:id/response')
  @ApiResponse({
    type: ResponseRdo,
    status: HttpStatus.CREATED,
    description: 'Response was successfully created',
  })
  async create(@Param('id') id: string) {
    const userId = '123'; //TODO: temporary
    const newResponse = await this.responseService.create(
      userId,
      Number.parseInt(id, 10)
    );
    return fillObject(ResponseRdo, newResponse);
  }

  @ApiResponse({
    type: ResponseRdo,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('task/:id/response')
  async showAll(@Param('id') taskId: string) {
    return fillObject(
      ResponseRdo,
      await this.responseService.findAllByTask(Number.parseInt(taskId, 10))
    );
  }
}
