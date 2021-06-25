import { prop, Ref } from '@typegoose/typegoose';
import { Course } from './Course.model';
export class Block {
  @prop()
  name: string;
  @prop()
  file: string;
  @prop({ ref: 'Course' })
  course: Ref<Course>;
}
