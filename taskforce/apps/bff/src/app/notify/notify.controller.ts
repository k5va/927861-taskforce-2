import { NotifyService } from './notify.service';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('notify')
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Sends new tasks mail notifications to all subscribers',
  })
  @ApiOkResponse({
    description: 'Notifications were sent',
  })
  async notifyNewTasks() {
    return this.notifyService.notifyNewTasks();
  }
}
