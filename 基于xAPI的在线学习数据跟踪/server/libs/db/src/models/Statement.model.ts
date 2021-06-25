import { prop } from '@typegoose/typegoose';
export class Statement {
  @prop({ required: true })
  actor: {
    objectType: string;
    account: {
      id: string;
      name: string;
      realname: string;
    };
  };
  @prop({ required: true })
  verb: {
    id: string;
    display: {
      en_US: string;
      zh_CN: string;
      content: string;
    };
  };
  @prop({ required: true })
  object: {
    id: string;
    definition: {
      name: string;
      description: string;
      type: string;
      course: string;
    };
  };
  @prop()
  result: {
    totalScore: string;
    scored: string;
    timestamp: string;
    volume: string;
    selectAnswer: string[];
    judgeAnswer: string[];
  };
  @prop()
  createdAt: string;
}
