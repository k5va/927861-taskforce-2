import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const NotifyQueue = {
  Tasks: 'tasks',
  Subscribers: 'subscribers',
} as const;

type QueueType = typeof NotifyQueue[keyof typeof NotifyQueue];

export function getRabbitMqOptions(
  configService: ConfigService,
  queueType: QueueType
): RmqOptions {
  const user = configService.get<string>('rmq.user');
  const password = configService.get<string>('rmq.password');
  const host = configService.get<string>('rmq.host');
  const port = configService.get<number>('rmq.port');
  const queue = configService.get<string>(
    queueType === 'subscribers' ? 'rmq.subscribersQueue' : 'rmq.tasksQueue'
  );
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
