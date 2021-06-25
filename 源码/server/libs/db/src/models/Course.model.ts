import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Block } from './Block.model';
import { Courseware } from './Courseware';
import { User } from './user.model';
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
  },
})
export class Course {
  @ApiProperty({ type: '课程名称' })
  @prop()
  name: string;
  @prop()
  image: string;
  @prop({ localField: '_id', foreignField: 'course', ref: 'Block' })
  blocks: Ref<Block>[];
  @prop({ localField: '_id', foreignField: 'course', ref: 'Courseware' })
  courseware: Ref<Courseware>[];
  @prop()
  createUser: Ref<User>;
}
