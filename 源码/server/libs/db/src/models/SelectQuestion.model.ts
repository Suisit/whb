import { prop, Ref } from '@typegoose/typegoose';
import { Exam } from './Exam.model';
import { Work } from './Work.model';

export class SelectQuestion {
  @prop()
  title: string;
  @prop()
  selectItem: string[];
  @prop()
  trueItem: string;
  @prop()
  score: number;
  @prop({ enum: ['Work', 'Exam'] })
  type: string;
  @prop({ refPath: 'type' })
  object: Ref<Work | Exam>;
}
