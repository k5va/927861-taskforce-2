import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { ResponseRepository } from './repository/response.repository';

@Module({
  controllers: [ResponseController],
  providers: [ResponseRepository, ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {}
