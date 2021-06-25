import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Thread } from './Thread.model';
import { User } from './user.model';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  @prop({ ref: 'User' })
  user: Ref<User>;
  @prop({ enum: ['Thread'] })
  type: string;
  @prop({ refPath: 'type' })
  object: Ref<Thread>;
  @prop()
  content: string;
}
