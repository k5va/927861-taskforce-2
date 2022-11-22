import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { ResponseRdo } from './rdo/response.rdo';

@Controller('tasks')
export class CommentController {
  constructor(private readonly responseService: ResponseService) {}

  @Post('task/:id/response')
  async create(@Param() id: string, @Body() dto: CreateResponseDto) {
    const userId = '';
    const newResponse = await this.responseService.create(userId, id, dto);
    return fillObject(ResponseRdo, newResponse);
  }

  @Get('task/:id/response')
  async showAll(@Param() id: string) {
    return this.responseService.findAllByTask(id);
  }
}
