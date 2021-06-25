import { Block } from '@libs/db/models/Block.model';
import { Course } from '@libs/db/models/Course.model';
import { User } from '@libs/db/models/user.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ModelType, Ref } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Roles } from 'src/users/role.decorator';
import { RolesGuard } from 'src/users/roles.guard';
class createCourse {
  @ApiProperty({ description: '课程名' })
  name: string;
  @ApiProperty({ description: '封面图' })
  image: string;
  blocks: Ref<Block>[];
  createUser: Ref<User>;
}
@ApiTags('课程')
@UseGuards(RolesGuard)
@Controller('courses')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly courseModel: ModelType<Course>,
  ) { }
  @Get('amount/all')
  @ApiOperation({ summary: '课程列表' })
  async index() {
    return await this.courseModel.find();
  }
  @Get(':id')
  @ApiOperation({ summary: '查找课程' })
  async searchUser(@Param('id') id: string) {
    return await this.courseModel.findById(id).populate('blocks');
  }
  @Get()
  @ApiOperation({ summary: '查找我的课程' })
  async searchMyCourse(@Query('query') query: string) {
    const params = JSON.parse(query);
    return await this.courseModel.find().where(params.where);
  }
  @Post()
  @Roles('teacher')
  @ApiOperation({ summary: '添加课程' })
  @ApiBearerAuth()
  async create(@Body() createUser: createCourse) {
    await this.courseModel.create(createUser);
    return {
      success: true,
    };
  }
  @Put(':id')
  @Roles('teacher', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新课程' })
  async update(@Param('id') id: string, @Body() updateUser: createCourse) {
    await this.courseModel.findByIdAndUpdate(id, updateUser);
  }
  @Delete(':id')
  @Roles('teacher', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除课程' })
  async delete(@Param('id') id: string) {
    await this.courseModel.findByIdAndDelete(id);
  }
}
