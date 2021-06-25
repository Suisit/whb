import { Answer } from '@libs/db/models/Answer.model';
import { JudgmentQuestion } from '@libs/db/models/JudgmentQuestion.model';
import { SelectQuestion } from '@libs/db/models/SelectQuestion.model';
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@ApiTags('答案')
@Controller('answer')
export class AnswerController {
  constructor(
    @InjectModel(Answer) private readonly answerModel: ModelType<Answer>,
    @InjectModel(SelectQuestion)
    private readonly selectModel: ModelType<SelectQuestion>,
    @InjectModel(JudgmentQuestion)
    private readonly judgmentModel: ModelType<JudgmentQuestion>,
  ) { }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @Req() req) {
    dto.user = req.user._id;
    const selectTrue = await this.selectModel
      .where({ object: dto.object })
      .select('+trueItem');
    const judgmentTrue = await this.judgmentModel
      .where({ object: dto.object })
      .select('+answer');
    for (let i = 0; i < selectTrue.length; i++) {
      if (selectTrue[i].trueItem == dto.select[i]) {
        dto.userScore += selectTrue[i].score;
      }
    }
    for (let i = 0; i < judgmentTrue.length; i++) {
      if (judgmentTrue[i].answer == dto.judgment[i]) {
        dto.userScore += judgmentTrue[i].score;
      }
    }
    console.log(judgmentTrue);
    console.log(dto);
    await this.answerModel.create(dto);
    return {
      totalScore: dto.totalScore,
      scored: dto.userScore,
    };
  }
  @Get()
  async index(@Query('query') query: string) {
    const params = JSON.parse(query);
    const res = await this.answerModel.find().where(params.where);
    console.log(res.length);
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  @Get('score')
  async getScore(@Query('query') query: string) {
    const params = JSON.parse(query);
    const res = await this.answerModel.find().where(params.where);
    return res.length > 0
      ? {
          score: res[0].userScore,
          totalScore: res[0].totalScore,
        }
      : -1;
  }
  @Get('allStudentScore')
  async getAllStudentScore(@Query('query') query: string) {
    const params = JSON.parse(query);
    const res = await this.answerModel
      .find()
      .where(params.where)
      .setOptions(params);
    return res;
  }
}
