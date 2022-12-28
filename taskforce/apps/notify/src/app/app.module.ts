import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SenderModule } from './sender/sender.module';
import { ENV_FILE_PATH } from './app.const';
import {
  getMailerOptions,
  getMongoDbOptions,
  mailConfig,
  mongoDbConfig,
} from '../config';
import envSchema from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mailConfig, mongoDbConfig],
      validationSchema: envSchema,
    }),
    MailerModule.forRootAsync(getMailerOptions()),
    MongooseModule.forRootAsync(getMongoDbOptions()),
    SenderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
