import { Module } from '@nestjs/common';
import { JudgmentQuestionsController } from './judgment-questions.controller';

@Module({
  controllers: [JudgmentQuestionsController]
})
export class JudgmentQuestionsModule {}
