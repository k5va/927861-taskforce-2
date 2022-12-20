import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SenderModule } from './sender/sender.module';
import { ENV_FILE_PATH } from './app.const';
import { getMailerOptions } from '../config/get-mailer-options';
import { mailConfig } from '../config/mail.config';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mailConfig],
      validationSchema: envSchema,
    }),
    MailerModule.forRootAsync(getMailerOptions()),
    SenderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
