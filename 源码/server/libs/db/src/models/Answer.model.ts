import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Course } from './Course.model';
import { Exam } from './Exam.model';
import { User } from './user.model';
import { Work } from './Work.model';
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class Answer {
  @prop({ ref: 'User' })
  user: Ref<User>;
  @prop()
  select: string[];
  @prop()
  judgment: string[];
  @prop({ enum: ['Work', 'Exam'] })
  type: string;
  @prop({ refPath: 'type' })
  object: Ref<Work | Exam>;
  @prop()
  course: Ref<Course>;
  @prop()
  userScore: number;
  @prop()
  totalScore: number;
}
