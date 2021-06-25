import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';

@Module({
  controllers: [AnswerController]
})
export class AnswerModule {}
