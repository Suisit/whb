import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';

@Module({
  controllers: [WorkController]
})
export class WorkModule {}
