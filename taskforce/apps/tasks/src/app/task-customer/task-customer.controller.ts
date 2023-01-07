import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { TaskCustomerService } from './task-customer.service';
import { TaskCustomerRdo } from './rdo/task-customer.rdo';

@ApiTags('tasks')
@Controller('tasks')
export class TaskContractorController {
  constructor(private readonly taskContractorService: TaskCustomerService) {}

  @Get('customer/:id')
  @ApiResponse({
    type: TaskCustomerRdo,
    status: HttpStatus.OK,
  })
  async show(@Param('id') customer: string) {
    return fillObject(
      TaskCustomerRdo,
      await this.taskContractorService.findByCustomerId(customer)
    );
  }
}
