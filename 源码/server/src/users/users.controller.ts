import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './role.decorator';
class createUser {
  @ApiProperty({ description: '用户名' })
  username: string;
  @ApiProperty({ description: '用户密码' })
  password: string;
  @ApiProperty({ description: '真实姓名' })
  realname: string;
  @ApiProperty()
  role: string;
}
@ApiTags('用户')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private readonly userModel: ModelType<User>,
  ) { }
  @Get('/allUsers')
  @Roles('teacher', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: '用户列表' })
  async index() {
    return await this.userModel.find();
  }
  @Get(':id')
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '查找用户' })
  async searchUser(@Param('id') id: string) {
    return await this.userModel.findById(id);
  }
  @Get()
  @ApiQuery({
    name: 'username',
  })
  @ApiOperation({ summary: '查找用户' })
  async searchUsername(@Query('username') username: any) {
    console.log(username);
    return await this.userModel.findOne({ username: username });
  }
  @Post()
  @Roles('teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: '注册用户' })
  async create(@Body() createUser: createUser) {
    await this.userModel.create(createUser);
    return {
      success: true,
    };
  }
  @Put(':id')
  @Roles('teacher', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新用户' })
  async update(@Param('id') id: string, @Body() updateUser: createUser) {
    await this.userModel.findByIdAndUpdate(id, updateUser);
  }
  @Delete(':id')
  @Roles('teacher', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除用户' })
  async delete(@Param('id') id: string) {
    await this.userModel.findByIdAndDelete(id);
  }
}
