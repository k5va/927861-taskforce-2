import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';

@Controller('send')
export class SenderController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('/')
  async sendMessages() {
    return this.mailerService.sendMail({
      to: 'keks@local.me',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: '<b>welcome</b>',
    });
  }
}
