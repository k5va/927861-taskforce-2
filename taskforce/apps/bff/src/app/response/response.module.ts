import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ResponseModule {}
