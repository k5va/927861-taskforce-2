import { Controller, Get } from '@nestjs/common';
import { SenderService } from './sender.service';

@Controller('send')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Get('/')
  async sendMessages() {
    return this.senderService.sendNotifyNewTasks();
  }
}
