import { Controller, Get, Param, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { ResponseService } from './response.service';
import { ResponseRdo } from './rdo/response.rdo';

@Controller('tasks')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post('task/:id/response')
  async create(@Param('id') id: string) {
    const userId = '';
    const newResponse = await this.responseService.create(userId, id);
    return fillObject(ResponseRdo, newResponse);
  }

  @Get('task/:id/response')
  async showAll(@Param('id') id: string) {
    return fillObject(ResponseRdo, await this.responseService.findAllByTask(id));
  }
}
