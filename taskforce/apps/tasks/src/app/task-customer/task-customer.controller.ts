import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { TaskCustomerService } from './task-customer.service';
import { TaskCustomerRdo } from './rdo/task-customer.rdo';

@ApiTags('tasks')
@Controller('tasks')
export class TaskContractorController {
  constructor(private readonly taskContractorService: TaskCustomerService) {}

  @Get('customer/:id')
  @ApiOperation({
    summary: 'Get task customer data: number of published and new tasks',
  })
  @ApiOkResponse({
    type: TaskCustomerRdo,
  })
  @ApiParam({ name: 'id', description: 'user id' })
  async show(@Param('id') customer: string) {
    return fillObject(
      TaskCustomerRdo,
      await this.taskContractorService.findByCustomerId(customer)
    );
  }
}
