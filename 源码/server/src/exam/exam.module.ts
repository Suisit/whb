import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';

@Module({
  controllers: [ExamController]
})
export class ExamModule {}
