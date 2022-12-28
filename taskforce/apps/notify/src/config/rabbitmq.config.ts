import { registerAs } from '@nestjs/config';

export const rabbitMqConfig = registerAs('rmq', () => ({
  user: process.env.RABBIT_USER,
  password: process.env.RABBIT_PASSWORD,
  host: process.env.RABBIT_HOST,
  queue: process.env.RABBIT_NOTIFY_SERVICE_QUEUE,
}));
