import { SelectQuestion } from '@libs/db/models/SelectQuestion.model';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Controller('select-questions')
export class SelectQuestionsController {
  constructor(
    @InjectModel(SelectQuestion)
    private readonly selectModel: ModelType<SelectQuestion>,
  ) { }
  @Post()
  async create(@Body() dto) {
    await this.selectModel.create(dto);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto) {
    await this.selectModel.findByIdAndUpdate(id, dto);
  }
  @Get()
  async index() {
    return await this.selectModel.find();
  }
}
