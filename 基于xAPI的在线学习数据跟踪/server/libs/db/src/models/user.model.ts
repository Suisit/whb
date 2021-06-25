import { modelOptions, prop } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
  },
})
export class User {
  @prop()
  username: string;
  @prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
  @prop()
  realname: string;
  @prop()
  role: string;
}
