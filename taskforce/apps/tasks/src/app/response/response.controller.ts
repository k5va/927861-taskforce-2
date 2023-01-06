import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  fillObject,
  GetUser,
  JwtAuthGuard,
  Roles,
  RolesGuard,
} from '@taskforce/core';
import { ResponseService } from './response.service';
import { ResponseRdo } from './rdo/response.rdo';
import { UserRole, UserRoles } from '@taskforce/shared-types';

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
  @Roles(UserRoles.Contractor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(@GetUser('id') userId: string, @Param('id') taskId: number) {
    const newResponse = await this.responseService.create(userId, taskId);
    return fillObject(ResponseRdo, newResponse);
  }

  @Get('task/:id/response')
  @ApiResponse({
    type: ResponseRdo,
    isArray: true,
    status: HttpStatus.OK,
  })
  async showAll(@Param('id') taskId: number) {
    return fillObject(
      ResponseRdo,
      await this.responseService.findAllByTask(taskId)
    );
  }
}
