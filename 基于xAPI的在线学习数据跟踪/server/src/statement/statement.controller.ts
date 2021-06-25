import { Statement } from '@libs/db/models/Statement.model';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Controller('statement')
export class StatementController {
  constructor(
    @InjectModel(Statement)
    private readonly statementModel: ModelType<Statement>,
  ) { }
  @Get('all')
  async index() {
    return await this.statementModel.find();
  }
  @Get()
  async userStatement(@Query('query') query: string) {
    const params = JSON.parse(query);
    const res = await this.statementModel
      .find({
        'actor.account.id': params.where.user,
        'object.definition.course': params.where.course,
      })
      .sort({ _id: -1 });
    return res;
  }
  @Get('video')
  async blockStatement(@Query('query') query: string) {
    const params = JSON.parse(query);
    const res = await this.statementModel
      .find({
        'object.definition.course': params.where.course,
        'verb.display.en_US': 'watched',
      })
      .sort({ _id: -1 });
    return res;
  }
  @Get('courseStatement')
  async courseStatement(@Query('query') query: string) {
    const params = JSON.parse(query);
    console.log(params.where.course);
    const res = await this.statementModel
      .find({
        'object.definition.course': params.where.course,
      })
      .sort({ _id: -1 });
    return res;
  }
  @Get('amount')
  async StatementAmount(@Query('query') query: string) {
    const params = JSON.parse(query);
    const res = await this.statementModel
      .find({
        'actor.account.id': params.where.user,
        'object.definition.course': params.where.course,
      })
      .sort({ _id: -1 });
    return res.length;
  }
  @Post()
  async create(@Body() dto) {
    await this.statementModel.create(dto);
  }
}
