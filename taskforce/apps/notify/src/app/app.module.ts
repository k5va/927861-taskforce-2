import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SenderModule } from './sender/sender.module';
import { ENV_FILE_PATH } from './app.const';
import { getMailerOptions, mailConfig, rabbitMqConfig } from '../config';
import envSchema from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { TaskNotificationModule } from './task-notification/task-notification.module';
import { mongoDbConfig, getMongoDbOptions } from '@taskforce/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mailConfig, mongoDbConfig, rabbitMqConfig],
      validationSchema: envSchema,
    }),
    MailerModule.forRootAsync(getMailerOptions()),
    MongooseModule.forRootAsync(getMongoDbOptions()),
    EmailSubscriberModule,
    TaskNotificationModule,
    SenderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
