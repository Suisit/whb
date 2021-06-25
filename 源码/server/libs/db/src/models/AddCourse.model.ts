import { prop, Ref } from '@typegoose/typegoose';
import { Course } from './Course.model';
import { User } from './user.model';

export class AddCourse {
  @prop({ ref: 'User' })
  user: Ref<User>;
  @prop({ ref: 'User' })
  teacher: Ref<User>;
  @prop({ ref: 'Course' })
  course: Ref<Course>;
}
