import { Module } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './task.const';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqOptions } from '../../config/get-rabbitmq-options';

@Module({
  imports: [
    CommentModule,
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqOptions,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService, ConfigService],
})
export class TaskModule {}
