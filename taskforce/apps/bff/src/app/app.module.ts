import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.const';
import { envSchema } from './env.schema';
import { servicesConfig } from '@taskforce/config';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { ResponseModule } from './response/response.module';
import { NotifyModule } from './notify/notify.module';

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
    CommentModule,
    CategoryModule,
    ReviewModule,
    ResponseModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
