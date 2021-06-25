import { Module } from '@nestjs/common';
import { SelectQuestionsController } from './select-questions.controller';

@Module({
  controllers: [SelectQuestionsController]
})
export class SelectQuestionsModule {}
