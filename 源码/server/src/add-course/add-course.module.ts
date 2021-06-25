import { Module } from '@nestjs/common';
import { AddCourseController } from './add-course.controller';

@Module({
  controllers: [AddCourseController]
})
export class AddCourseModule {}
