import { Module } from '@nestjs/common';
import { BlocksController } from './blocks.controller';

@Module({
  controllers: [BlocksController],
})
export class BlocksModule {}
