import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { BlocksModule } from './blocks/blocks.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { ThreadsModule } from './threads/threads.module';
import { CoursewaresModule } from './coursewares/coursewares.module';
import { WorkModule } from './work/work.module';
import { SelectQuestionsModule } from './select-questions/select-questions.module';
import { JudgmentQuestionsModule } from './judgment-questions/judgment-questions.module';
import { AnswerModule } from './answer/answer.module';
import { ExamModule } from './exam/exam.module';
import { AddCourseModule } from './add-course/add-course.module';
import { StatementModule } from './statement/statement.module';
@Module({
  imports: [
    DbModule,
    UsersModule,
    CoursesModule,
    BlocksModule,
    AuthModule,
    CommentsModule,
    ThreadsModule,
    CoursewaresModule,
    WorkModule,
    SelectQuestionsModule,
    JudgmentQuestionsModule,
    AnswerModule,
    ExamModule,
    AddCourseModule,
    StatementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
