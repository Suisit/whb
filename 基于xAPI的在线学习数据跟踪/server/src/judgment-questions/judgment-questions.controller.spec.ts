import { Test, TestingModule } from '@nestjs/testing';
import { JudgmentQuestionsController } from './judgment-questions.controller';

describe('JudgmentQuestionsController', () => {
  let controller: JudgmentQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JudgmentQuestionsController],
    }).compile();

    controller = module.get<JudgmentQuestionsController>(JudgmentQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
