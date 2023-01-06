import { Module } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './task.const';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqOptions } from '@taskforce/config';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterOptions } from '@taskforce/config';

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
    MulterModule.registerAsync({
      useFactory: getMulterOptions,
      inject: [ConfigService],
    }),
  ],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService, ConfigService],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {}
