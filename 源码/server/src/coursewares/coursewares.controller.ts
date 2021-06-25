import { Course } from '@libs/db/models/Course.model';
import { Courseware } from '@libs/db/models/Courseware';
import { User } from '@libs/db/models/user.model';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ModelType, Ref } from '@typegoose/typegoose/lib/types';
import { query } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { Roles } from 'src/users/role.decorator';
class createCourseware {
  @ApiProperty({ description: '课件名' })
  name: string;
  file: string;
  course: Ref<Course>;
  createUser: Ref<User>;
}
@ApiTags('课件')
@Controller('coursewares')
export class CoursewaresController {
  constructor(
    @InjectModel(Courseware)
    private readonly coursewareModel: ModelType<Courseware>,
  ) { }
  @Get()
  @ApiBearerAuth()
  async searchCoursewares(@Query('query') query) {
    const params = JSON.parse(query);
    return await this.coursewareModel
      .find()
      .populate(['course', 'user'])
      .where(params.where)
      .setOptions(params);
  }
  @Get('amount')
  @ApiBearerAuth()
  async amount(@Query('query') query) {
    const params = JSON.parse(query);
    const res = await this.coursewareModel
      .find()
      .where(params.where)
      .setOptions(params);
    return res.length;
  }
  @Post()
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '添加课件' })
  async create(@Body() createCourseware: createCourseware) {
    await this.coursewareModel.create(createCourseware);
    return {
      success: true,
    };
  }
  @Put(':id')
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新课件' })
  async update(@Param('id') id: string, @Body() updateUser: createCourseware) {
    await this.coursewareModel.findByIdAndUpdate(id, updateUser);
  }
  @Delete(':id')
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除课件' })
  async delete(@Param('id') id: string) {
    await this.coursewareModel.findByIdAndDelete(id);
  }
}
