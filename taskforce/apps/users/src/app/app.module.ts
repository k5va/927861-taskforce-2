import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskUserModule } from './task-user/task-user.module';

@Module({
  imports: [AuthModule, TaskUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
