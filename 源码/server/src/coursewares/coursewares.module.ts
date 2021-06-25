import { Module } from '@nestjs/common';
import { CoursewaresController } from './coursewares.controller';

@Module({
  controllers: [CoursewaresController]
})
export class CoursewaresModule {}
