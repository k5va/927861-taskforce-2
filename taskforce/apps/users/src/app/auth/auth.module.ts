import { Module } from '@nestjs/common';
import { TaskUserModule } from '../task-user/task-user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TaskUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
