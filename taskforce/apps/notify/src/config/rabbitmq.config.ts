import { registerAs } from '@nestjs/config';

export const rabbitMqConfig = registerAs('rmq', () => ({
  user: process.env.RABBIT_USER,
  password: process.env.RABBIT_PASSWORD,
  host: process.env.RABBIT_HOST,
  port: process.env.RABBIT_PORT,
  queue: process.env.RABBIT_NOTIFY_SERVICE_QUEUE,
}));
