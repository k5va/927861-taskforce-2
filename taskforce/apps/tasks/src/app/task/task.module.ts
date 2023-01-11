import { Module } from '@nestjs/common';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './task.const';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqOptions } from '@taskforce/config';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterOptions } from '@taskforce/config';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
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
    CategoryModule,
  ],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService, ConfigService],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {}
