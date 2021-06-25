import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import multer = require('multer');
import * as nuid from 'nuid';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
          console.log(file);
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file) {
    return {
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
