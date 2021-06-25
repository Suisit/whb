import { AddCourse } from '@libs/db/models/AddCourse.model';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Roles } from 'src/users/role.decorator';

@Controller('add-course')
export class AddCourseController {
  constructor(
    @InjectModel(AddCourse)
    private readonly addCourseModel: ModelType<AddCourse>,
  ) { }
  @Get()
  async index(@Query('query') query: string) {
    const params = JSON.parse(query);
    const res = await this.addCourseModel
      .find()
      .where(params.where)
      .setOptions(params);
    return res;
  }
  @Post()
  async create(@Body() dto) {
    await this.addCourseModel.create(dto);
  }
  @Delete()
  async deletek(@Query('query') query) {
    const params = JSON.parse(query);
    return await this.addCourseModel
      .remove()
      .where(params.where)
      .setOptions(params);
  }
}
