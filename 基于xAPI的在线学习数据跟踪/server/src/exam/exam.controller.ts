import { Exam } from '@libs/db/models/Exam.model';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
class exam {
  @ApiProperty({ description: '标题' })
  title: string;
  @ApiProperty({ description: '创建用户' })
  createUser: string;
  @ApiProperty({ description: '总分' })
  totalScore: number;
  @ApiProperty({ description: '所属课程' })
  course: string;
  @ApiProperty({ description: '时长' })
  time: string;
}
@Controller('exam')
export class ExamController {
  constructor(@InjectModel(Exam) private readonly examModel: ModelType<Exam>) { }
  @Get('all')
  async index() {
    return await this.examModel.find();
  }
  @Get()
  async getWork(@Query('query') query) {
    const params = JSON.parse(query);
    return await this.examModel.find().where(params.where).setOptions(params);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.examModel.findByIdAndDelete(id);
  }
  @Get(':examId')
  async searchWork(@Param('examId') examId: string, @Query('query') query) {
    const params = JSON.parse(query);
    return await this.examModel.findById(examId).populate(params.populate);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: exam, @Req() req) {
    dto.createUser = req.user._id;
    return await this.examModel.create(dto);
  }
  @Put(':examId')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('examId') examId: string, @Body() dto: exam, @Req() req) {
    dto.createUser = req.user._id;
    return await this.examModel.findByIdAndUpdate(examId, dto);
  }
}
