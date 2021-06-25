import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Course } from './Course.model';
import { JudgmentQuestion } from './JudgmentQuestion.model';
import { SelectQuestion } from './SelectQuestion.model';
import { User } from './user.model';
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
  },
})
export class Exam {
  @prop()
  title: string;
  @prop()
  createUser: Ref<User>;
  @prop({ localField: '_id', foreignField: 'object', ref: 'SelectQuestion' })
  selectQuestions: Ref<SelectQuestion>[];
  @prop({ localField: '_id', foreignField: 'object', ref: 'JudgmentQuestion' })
  judgmentQuestions: Ref<JudgmentQuestion>[];
  @prop()
  totalScore: number;
  @prop({ ref: 'Course' })
  course: Ref<Course>;
  @prop()
  time: number;
}
