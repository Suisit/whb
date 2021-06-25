import { Test, TestingModule } from '@nestjs/testing';
import { AddCourseController } from './add-course.controller';

describe('AddCourseController', () => {
  let controller: AddCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddCourseController],
    }).compile();

    controller = module.get<AddCourseController>(AddCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
