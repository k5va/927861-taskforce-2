import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const NotifyQueue = {
  Tasks: 'rmq.tasksQueue',
  Subscribers: 'rmq.subscribersQueue',
} as const;

type TQueue = typeof NotifyQueue[keyof typeof NotifyQueue];

export function getRabbitMqOptions(
  configService: ConfigService,
  queueType: TQueue
): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const port = configService.get<number>('rmq.port');
  const queue = configService.get<string>(queueType);
  const url = `amqp://${user}:${password}@${host}:${port}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      persistent: true,
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  };
}
