import { JudgmentQuestion } from '@libs/db/models/JudgmentQuestion.model';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Controller('judgment-questions')
export class JudgmentQuestionsController {
  constructor(
    @InjectModel(JudgmentQuestion)
    private readonly judgmentModel: ModelType<JudgmentQuestion>,
  ) {}
  @Post()
  async create(@Body() dto) {
    await this.judgmentModel.create(dto);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto) {
    await this.judgmentModel.findByIdAndUpdate(id, dto);
  }
}
