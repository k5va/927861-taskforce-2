import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { TaskContractorService } from './task-contractor.service';
import { ContractorRatingRdo } from './rdo/contractor-rating.rdo';

@ApiTags('tasks')
@Controller('tasks')
export class TaskContractorController {
  constructor(private readonly taskContractorService: TaskContractorService) {}

  @Get('contractor/:id/rating')
  @ApiResponse({
    type: ContractorRatingRdo,
    status: HttpStatus.OK,
  })
  async getRating(@Param('id') contractor: string) {
    return fillObject(
      ContractorRatingRdo,
      await this.taskContractorService.getRating(contractor)
    );
  }
}
