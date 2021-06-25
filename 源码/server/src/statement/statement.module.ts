import { Module } from '@nestjs/common';
import { StatementController } from './statement.controller';

@Module({
  controllers: [StatementController]
})
export class StatementModule {}
