import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { getRabbitMqOptions } from '@taskforce/config';
import { TaskUserModule } from '../task-user/task-user.module';
import { RABBITMQ_SERVICE } from './auth.const';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, RtStrategy } from './strategies';
import { getMulterOptions } from '@taskforce/config';

@Module({
  imports: [
    TaskUserModule,
    PassportModule,
    JwtModule.register({}),
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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RtStrategy, ConfigService],
})
export class AuthModule {}
