import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export function getMailerOptions(): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: `${configService.get<string>(
        'mail.protocol'
      )}://${configService.get<string>(
        'mail.host'
      )}:${configService.get<string>('mail.port')}`,
      defaults: {
        from: configService.get<string>('mail.from'),
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  };
}
