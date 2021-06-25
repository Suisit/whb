import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Course } from './Course.model';
import { User } from './user.model';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Courseware {
  @prop()
  name: string;
  @prop()
  file: string;
  @prop({ ref: 'Course' })
  course: Ref<Course>;
  @prop()
  createUser: Ref<User>;
}
