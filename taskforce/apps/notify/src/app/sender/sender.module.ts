import { Module } from '@nestjs/common';
import { SenderController } from './sender.controller';

@Module({
  imports: [],
  controllers: [SenderController],
  providers: [],
})
export class SenderModule {}
