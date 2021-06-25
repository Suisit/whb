import { Test, TestingModule } from '@nestjs/testing';
import { SelectQuestionsController } from './select-questions.controller';

describe('SelectQuestionsController', () => {
  let controller: SelectQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectQuestionsController],
    }).compile();

    controller = module.get<SelectQuestionsController>(SelectQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
