import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.const';
import { envSchema } from './env.schema';
import { servicesConfig } from '@taskforce/config';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [servicesConfig],
      validationSchema: envSchema,
    }),
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
