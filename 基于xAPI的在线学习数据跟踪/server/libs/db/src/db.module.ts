import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/Course.model';
import { Block } from './models/Block.model';
import { JwtModule } from '@nestjs/jwt';
import { Statement } from './models/Statement.model';
import { Comment } from './models/Comment.model';
import { Thread } from './models/Thread.model';
import { Courseware } from './models/Courseware';
import { Work } from './models/Work.model';
import { SelectQuestion } from './models/SelectQuestion.model';
import { JudgmentQuestion } from './models/JudgmentQuestion.model';
import { Answer } from './models/Answer.model';
import { Exam } from './models/Exam.model';
import { AddCourse } from './models/AddCourse.model';
const models = TypegooseModule.forFeature([
  User,
  Course,
  Block,
  Statement,
  Comment,
  Thread,
  Courseware,
  Work,
  SelectQuestion,
  JudgmentQuestion,
  Answer,
  Exam,
  AddCourse,
]);
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/xapi-lms', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    models,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: 's123hasjhe123hkaosehdo12hjiejaskd4',
        };
      },
    }),
  ],
  providers: [DbService],
  exports: [DbService, models, JwtModule],
})
export class DbModule { }
