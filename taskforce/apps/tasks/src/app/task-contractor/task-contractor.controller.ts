import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { TaskContractorService } from './task-contractor.service';
import { TaskContractorRdo } from '@taskforce/core';

@ApiTags('tasks')
@Controller('tasks')
export class TaskContractorController {
  constructor(private readonly taskContractorService: TaskContractorService) {}

  @Get('contractor/:id')
  @ApiOperation({
    summary:
      'Get task contractor data: rating, place in rating, number of completed and failed tasks',
  })
  @ApiOkResponse({
    type: TaskContractorRdo,
  })
  async getRating(@Param('id') contractor: string) {
    return fillObject(
      TaskContractorRdo,
      await this.taskContractorService.findByContractorId(contractor)
    );
  }
}
