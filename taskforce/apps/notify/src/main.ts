/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { getRabbitMqOptions, NotifyQueue } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Taskforce:notify service')
    .setDescription('Taskforce:notify service api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(
    getRabbitMqOptions(configService, NotifyQueue.Subscribers)
  );
  app.connectMicroservice(getRabbitMqOptions(configService, NotifyQueue.Tasks));

  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Notify is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
