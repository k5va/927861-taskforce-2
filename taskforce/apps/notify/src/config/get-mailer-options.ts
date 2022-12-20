import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';

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
    }),
    inject: [ConfigService],
  };
}
