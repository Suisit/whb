import { Thread } from '@libs/db/models/Thread.model';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Roles } from 'src/users/role.decorator';
@ApiTags('讨论区')
@Controller('threads')
export class ThreadsController {
  constructor(
    @InjectModel(Thread) private readonly threadModel: ModelType<Thread>,
  ) { }
  @Get('all')
  @ApiBearerAuth()
  async getAll() {
    return await this.threadModel.find();
  }
  @Get()
  @ApiBearerAuth()
  async index(@Query('query') query: string) {
    const params = JSON.parse(query);
    return await this.threadModel
      .find()
      .populate(['object', 'user'])
      .where(params.where)
      .setOptions(params);
  }
  @Get(':id')
  @ApiBearerAuth()
  async getThread(@Param('id') id: string) {
    return await this.threadModel
      .findById(id)
      .populate(['object', 'user'])
      .limit(20);
  }
  @Get('amount/amount')
  async commentAmount(@Query('query') query: string) {
    const params = JSON.parse(query);
    const res = await this.threadModel.find().where(params.where);
    return res.length;
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createThread(@Body() dto, @Req() req) {
    dto.user = req.user._id;
    const res = await this.threadModel.create(dto);
    return res._id;
  }
  @Delete(':id')
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除帖子' })
  async delete(@Param('id') id: string) {
    await this.threadModel.findByIdAndDelete(id);
  }
  @Put(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() update) {
    await this.threadModel.findByIdAndUpdate(id, update);
  }
}
