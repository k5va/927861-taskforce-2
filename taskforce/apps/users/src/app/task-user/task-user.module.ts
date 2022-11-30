import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserRepository } from './repository/task-user.repository';
import { TaskUserModel, TaskUserSchema } from './task-user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskUserModel.name, schema: TaskUserSchema },
    ]),
  ],
  providers: [TaskUserRepository],
  exports: [TaskUserRepository],
})
export class TaskUserModule {}
