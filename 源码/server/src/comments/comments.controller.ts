import { Comment } from '@libs/db/models/Comment.model';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
@Controller('comments')
export class CommentsController {
  constructor(
    @InjectModel(Comment) private readonly commentModel: ModelType<Comment>,
  ) { }
  @Get()
  async index(@Query('query') query) {
    const params = JSON.parse(query);
    return await this.commentModel
      .find()
      .populate(['object', 'user'])
      .where(params.where)
      .setOptions(params);
  }
  @Get('all')
  async getAll() {
    return await this.commentModel.find();
  }
  
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @Req() req) {
    dto.user = req.user._id;
    return await this.commentModel.create(dto);
  }
}
