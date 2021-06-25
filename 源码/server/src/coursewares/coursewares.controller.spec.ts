import { Test, TestingModule } from '@nestjs/testing';
import { CoursewaresController } from './coursewares.controller';

describe('CoursewaresController', () => {
  let controller: CoursewaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursewaresController],
    }).compile();

    controller = module.get<CoursewaresController>(CoursewaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
