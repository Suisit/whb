import { Work } from '@libs/db/models/Work.model';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { setGlobalOptions } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
class work {
  @ApiProperty({ description: '标题' })
  title: string;
  @ApiProperty({ description: '创建用户' })
  createUser: string;
  @ApiProperty({ description: '总分' })
  totalScore: number;
  @ApiProperty({ description: '所属课程' })
  course: string;
}
@ApiTags('作业')
@Controller('works')
export class WorkController {
  constructor(@InjectModel(Work) private readonly workModel: ModelType<Work>) { }
  @Get('all')
  async index() {
    return await this.workModel.find();
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.workModel.findByIdAndDelete(id);
  }
  @Get()
  async getWork(@Query('query') query) {
    const params = JSON.parse(query);
    return await this.workModel.find().where(params.where).setOptions(params);
  }
  @Get(':workId')
  async searchWork(@Param('workId') workId: string, @Query('query') query) {
    const params = JSON.parse(query);
    return await this.workModel.findById(workId).populate(params.populate);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: work, @Req() req) {
    dto.createUser = req.user._id;
    return await this.workModel.create(dto);
  }
  @Put(':workId')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('workId') workId: string, @Body() dto: work, @Req() req) {
    dto.createUser = req.user._id;
    return await this.workModel.findByIdAndUpdate(workId, dto);
  }
}
