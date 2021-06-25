import { Block } from '@libs/db/models/Block.model';
import { Course } from '@libs/db/models/Course.model';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Ref } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Roles } from 'src/users/role.decorator';
import { RolesGuard } from 'src/users/roles.guard';
class createBlock {
  @ApiProperty({ description: '课时名' })
  name: string;
  file: string;
  course: Ref<Course>;
}
@ApiTags('课时')
@UseGuards(RolesGuard)
@Controller('blocks')
export class BlocksController {
  constructor(
    @InjectModel(Block) private readonly blockModel: ModelType<Block>,
  ) { }
  @Get()
  @ApiOperation({ summary: '课时列表' })
  async index() {
    return await this.blockModel.find();
  }
  @Get(':id')
  @ApiOperation({ summary: '查找课时' })
  async searchBlock(@Param('id') id: string) {
    return await this.blockModel.findById(id);
  }
  @Get('amount/amount')
  @ApiOperation({ summary: '查找课时数量' })
  async blockAmount(@Query('query') query) {
    const params = JSON.parse(query);
    const res = await this.blockModel.find().where(params.where);
    return res.length;
  }
  @Post()
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '添加课时' })
  async create(@Body() createBlock: createBlock) {
    await this.blockModel.create(createBlock);
    return {
      success: true,
    };
  }
  @Put(':id')
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新课时' })
  async update(@Param('id') id: string, @Body() updateBlock: createBlock) {
    await this.blockModel.findByIdAndUpdate(id, updateBlock);
  }
  @Delete(':id')
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除课时' })
  async delete(@Param('id') id: string) {
    await this.blockModel.findByIdAndDelete(id);
  }
}
