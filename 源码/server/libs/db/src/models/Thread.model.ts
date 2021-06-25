import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Course } from './Course.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Thread {
  @prop()
  title: string;
  @prop()
  content: any;
  @prop({ ref: 'User' })
  user: Ref<User>;
  @prop({ enum: ['Course'] })
  type: string;
  @prop({ refPath: 'type' })
  object: Ref<Course>;
}
