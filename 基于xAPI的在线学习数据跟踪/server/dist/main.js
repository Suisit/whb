/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useStaticAssets('uploads', {
        prefix: '/uploads',
    });
    app.useStaticAssets('uploadCourses', {
        prefix: '/uploadCourses',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('xAPI-LMS')
        .setDescription('LMS接口')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(3000);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");;

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");;

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const db_1 = __webpack_require__(4);
const common_1 = __webpack_require__(6);
const app_controller_1 = __webpack_require__(25);
const app_service_1 = __webpack_require__(27);
const courses_module_1 = __webpack_require__(30);
const users_module_1 = __webpack_require__(35);
const blocks_module_1 = __webpack_require__(37);
const auth_module_1 = __webpack_require__(39);
const comments_module_1 = __webpack_require__(46);
const threads_module_1 = __webpack_require__(48);
const coursewares_module_1 = __webpack_require__(50);
const work_module_1 = __webpack_require__(52);
const select_questions_module_1 = __webpack_require__(54);
const judgment_questions_module_1 = __webpack_require__(56);
const answer_module_1 = __webpack_require__(58);
const exam_module_1 = __webpack_require__(60);
const add_course_module_1 = __webpack_require__(62);
const statement_module_1 = __webpack_require__(64);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            db_1.DbModule,
            users_module_1.UsersModule,
            courses_module_1.CoursesModule,
            blocks_module_1.BlocksModule,
            auth_module_1.AuthModule,
            comments_module_1.CommentsModule,
            threads_module_1.ThreadsModule,
            coursewares_module_1.CoursewaresModule,
            work_module_1.WorkModule,
            select_questions_module_1.SelectQuestionsModule,
            judgment_questions_module_1.JudgmentQuestionsModule,
            answer_module_1.AnswerModule,
            exam_module_1.ExamModule,
            add_course_module_1.AddCourseModule,
            statement_module_1.StatementModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5), exports);
__exportStar(__webpack_require__(7), exports);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbModule = void 0;
const common_1 = __webpack_require__(6);
const db_service_1 = __webpack_require__(7);
const nestjs_typegoose_1 = __webpack_require__(8);
const user_model_1 = __webpack_require__(9);
const Course_model_1 = __webpack_require__(12);
const Block_model_1 = __webpack_require__(13);
const jwt_1 = __webpack_require__(14);
const Statement_model_1 = __webpack_require__(15);
const Comment_model_1 = __webpack_require__(16);
const Thread_model_1 = __webpack_require__(17);
const Courseware_1 = __webpack_require__(18);
const Work_model_1 = __webpack_require__(19);
const SelectQuestion_model_1 = __webpack_require__(20);
const JudgmentQuestion_model_1 = __webpack_require__(21);
const Answer_model_1 = __webpack_require__(22);
const Exam_model_1 = __webpack_require__(23);
const AddCourse_model_1 = __webpack_require__(24);
const models = nestjs_typegoose_1.TypegooseModule.forFeature([
    user_model_1.User,
    Course_model_1.Course,
    Block_model_1.Block,
    Statement_model_1.Statement,
    Comment_model_1.Comment,
    Thread_model_1.Thread,
    Courseware_1.Courseware,
    Work_model_1.Work,
    SelectQuestion_model_1.SelectQuestion,
    JudgmentQuestion_model_1.JudgmentQuestion,
    Answer_model_1.Answer,
    Exam_model_1.Exam,
    AddCourse_model_1.AddCourse,
]);
let DbModule = class DbModule {
};
DbModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forRoot('mongodb://localhost/xapi-lms', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }),
            models,
            jwt_1.JwtModule.registerAsync({
                useFactory() {
                    return {
                        secret: 's123hasjhe123hkaosehdo12hjiejaskd4',
                    };
                },
            }),
        ],
        providers: [db_service_1.DbService],
        exports: [db_service_1.DbService, models, jwt_1.JwtModule],
    })
], DbModule);
exports.DbModule = DbModule;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/common");;

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbService = void 0;
const common_1 = __webpack_require__(6);
let DbService = class DbService {
};
DbService = __decorate([
    common_1.Injectable()
], DbService);
exports.DbService = DbService;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("nestjs-typegoose");;

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typegoose_1 = __webpack_require__(10);
const bcryptjs_1 = __webpack_require__(11);
let User = class User {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({
        select: false,
        get(val) {
            return val;
        },
        set(val) {
            return val ? bcryptjs_1.hashSync(val) : val;
        },
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "realname", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            toJSON: { virtuals: true },
        },
    })
], User);
exports.User = User;


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@typegoose/typegoose");;

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("bcryptjs");;

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Course = void 0;
const swagger_1 = __webpack_require__(2);
const typegoose_1 = __webpack_require__(10);
let Course = class Course {
};
__decorate([
    swagger_1.ApiProperty({ type: '课程名称' }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Course.prototype, "image", void 0);
__decorate([
    typegoose_1.prop({ localField: '_id', foreignField: 'course', ref: 'Block' }),
    __metadata("design:type", Array)
], Course.prototype, "blocks", void 0);
__decorate([
    typegoose_1.prop({ localField: '_id', foreignField: 'course', ref: 'Courseware' }),
    __metadata("design:type", Array)
], Course.prototype, "courseware", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], Course.prototype, "createUser", void 0);
Course = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            toJSON: { virtuals: true },
        },
    })
], Course);
exports.Course = Course;


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Block = void 0;
const typegoose_1 = __webpack_require__(10);
class Block {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Block.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Block.prototype, "file", void 0);
__decorate([
    typegoose_1.prop({ ref: 'Course' }),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], Block.prototype, "course", void 0);
exports.Block = Block;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");;

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Statement = void 0;
const typegoose_1 = __webpack_require__(10);
class Statement {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Object)
], Statement.prototype, "actor", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Object)
], Statement.prototype, "verb", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Object)
], Statement.prototype, "object", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Statement.prototype, "result", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Statement.prototype, "createdAt", void 0);
exports.Statement = Statement;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Comment = void 0;
const typegoose_1 = __webpack_require__(10);
let Comment = class Comment {
};
__decorate([
    typegoose_1.prop({ ref: 'User' }),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], Comment.prototype, "user", void 0);
__decorate([
    typegoose_1.prop({ enum: ['Thread'] }),
    __metadata("design:type", String)
], Comment.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({ refPath: 'type' }),
    __metadata("design:type", typeof (_b = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _b : Object)
], Comment.prototype, "object", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
Comment = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
        },
    })
], Comment);
exports.Comment = Comment;


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Thread = void 0;
const typegoose_1 = __webpack_require__(10);
let Thread = class Thread {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Thread.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Thread.prototype, "content", void 0);
__decorate([
    typegoose_1.prop({ ref: 'User' }),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], Thread.prototype, "user", void 0);
__decorate([
    typegoose_1.prop({ enum: ['Course'] }),
    __metadata("design:type", String)
], Thread.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({ refPath: 'type' }),
    __metadata("design:type", typeof (_b = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _b : Object)
], Thread.prototype, "object", void 0);
Thread = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
        },
    })
], Thread);
exports.Thread = Thread;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Courseware = void 0;
const typegoose_1 = __webpack_require__(10);
let Courseware = class Courseware {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Courseware.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Courseware.prototype, "file", void 0);
__decorate([
    typegoose_1.prop({ ref: 'Course' }),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], Courseware.prototype, "course", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", typeof (_b = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _b : Object)
], Courseware.prototype, "createUser", void 0);
Courseware = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
        },
    })
], Courseware);
exports.Courseware = Courseware;


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Work = void 0;
const typegoose_1 = __webpack_require__(10);
let Work = class Work {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Work.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], Work.prototype, "createUser", void 0);
__decorate([
    typegoose_1.prop({ localField: '_id', foreignField: 'object', ref: 'SelectQuestion' }),
    __metadata("design:type", Array)
], Work.prototype, "selectQuestions", void 0);
__decorate([
    typegoose_1.prop({ localField: '_id', foreignField: 'object', ref: 'JudgmentQuestion' }),
    __metadata("design:type", Array)
], Work.prototype, "judgmentQuestions", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Work.prototype, "totalScore", void 0);
__decorate([
    typegoose_1.prop({ ref: 'Course' }),
    __metadata("design:type", typeof (_b = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _b : Object)
], Work.prototype, "course", void 0);
Work = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            toJSON: { virtuals: true },
        },
    })
], Work);
exports.Work = Work;


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectQuestion = void 0;
const typegoose_1 = __webpack_require__(10);
class SelectQuestion {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], SelectQuestion.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Array)
], SelectQuestion.prototype, "selectItem", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], SelectQuestion.prototype, "trueItem", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], SelectQuestion.prototype, "score", void 0);
__decorate([
    typegoose_1.prop({ enum: ['Work', 'Exam'] }),
    __metadata("design:type", String)
], SelectQuestion.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({ refPath: 'type' }),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], SelectQuestion.prototype, "object", void 0);
exports.SelectQuestion = SelectQuestion;


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JudgmentQuestion = void 0;
const typegoose_1 = __webpack_require__(10);
class JudgmentQuestion {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], JudgmentQuestion.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], JudgmentQuestion.prototype, "answer", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], JudgmentQuestion.prototype, "score", void 0);
__decorate([
    typegoose_1.prop({ enum: ['Work', 'Exam'] }),
    __metadata("design:type", String)
], JudgmentQuestion.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({ refPath: 'type' }),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], JudgmentQuestion.prototype, "object", void 0);
exports.JudgmentQuestion = JudgmentQuestion;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Answer = void 0;
const typegoose_1 = __webpack_require__(10);
let Answer = class Answer {
};
__decorate([
    typegoose_1.prop({ ref: 'User' }),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], Answer.prototype, "user", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Answer.prototype, "select", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Answer.prototype, "judgment", void 0);
__decorate([
    typegoose_1.prop({ enum: ['Work', 'Exam'] }),
    __metadata("design:type", String)
], Answer.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({ refPath: 'type' }),
    __metadata("design:type", typeof (_b = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _b : Object)
], Answer.prototype, "object", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", typeof (_c = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _c : Object)
], Answer.prototype, "course", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Answer.prototype, "userScore", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Answer.prototype, "totalScore", void 0);
Answer = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
            toJSON: { virtuals: true },
        },
    })
], Answer);
exports.Answer = Answer;


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Exam = void 0;
const typegoose_1 = __webpack_require__(10);
let Exam = class Exam {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Exam.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], Exam.prototype, "createUser", void 0);
__decorate([
    typegoose_1.prop({ localField: '_id', foreignField: 'object', ref: 'SelectQuestion' }),
    __metadata("design:type", Array)
], Exam.prototype, "selectQuestions", void 0);
__decorate([
    typegoose_1.prop({ localField: '_id', foreignField: 'object', ref: 'JudgmentQuestion' }),
    __metadata("design:type", Array)
], Exam.prototype, "judgmentQuestions", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Exam.prototype, "totalScore", void 0);
__decorate([
    typegoose_1.prop({ ref: 'Course' }),
    __metadata("design:type", typeof (_b = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _b : Object)
], Exam.prototype, "course", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Exam.prototype, "time", void 0);
Exam = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            toJSON: { virtuals: true },
        },
    })
], Exam);
exports.Exam = Exam;


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddCourse = void 0;
const typegoose_1 = __webpack_require__(10);
class AddCourse {
}
__decorate([
    typegoose_1.prop({ ref: 'User' }),
    __metadata("design:type", typeof (_a = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _a : Object)
], AddCourse.prototype, "user", void 0);
__decorate([
    typegoose_1.prop({ ref: 'User' }),
    __metadata("design:type", typeof (_b = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _b : Object)
], AddCourse.prototype, "teacher", void 0);
__decorate([
    typegoose_1.prop({ ref: 'Course' }),
    __metadata("design:type", typeof (_c = typeof typegoose_1.Ref !== "undefined" && typegoose_1.Ref) === "function" ? _c : Object)
], AddCourse.prototype, "course", void 0);
exports.AddCourse = AddCourse;


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(26);
const app_service_1 = __webpack_require__(27);
const multer = __webpack_require__(28);
const nuid = __webpack_require__(29);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async upload(file) {
        return {
            url: `http://localhost:3000/uploads/${file.filename}`,
        };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Post('upload'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads');
            },
            filename: (req, file, cb) => {
                console.log(file);
                const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
                return cb(null, filename);
            },
        }),
    })),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "upload", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");;

/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(6);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("multer");;

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("nuid");;

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesModule = void 0;
const common_1 = __webpack_require__(6);
const courses_controller_1 = __webpack_require__(31);
let CoursesModule = class CoursesModule {
};
CoursesModule = __decorate([
    common_1.Module({
        controllers: [courses_controller_1.CoursesController],
    })
], CoursesModule);
exports.CoursesModule = CoursesModule;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesController = void 0;
const Course_model_1 = __webpack_require__(12);
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
const role_decorator_1 = __webpack_require__(33);
const roles_guard_1 = __webpack_require__(34);
class createCourse {
}
__decorate([
    swagger_1.ApiProperty({ description: '课程名' }),
    __metadata("design:type", String)
], createCourse.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '封面图' }),
    __metadata("design:type", String)
], createCourse.prototype, "image", void 0);
let CoursesController = class CoursesController {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async index() {
        return await this.courseModel.find();
    }
    async searchUser(id) {
        return await this.courseModel.findById(id).populate('blocks');
    }
    async searchMyCourse(query) {
        const params = JSON.parse(query);
        return await this.courseModel.find().where(params.where);
    }
    async create(createUser) {
        await this.courseModel.create(createUser);
        return {
            success: true,
        };
    }
    async update(id, updateUser) {
        await this.courseModel.findByIdAndUpdate(id, updateUser);
    }
    async delete(id) {
        await this.courseModel.findByIdAndDelete(id);
    }
};
__decorate([
    common_1.Get('amount/all'),
    swagger_1.ApiOperation({ summary: '课程列表' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "index", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: '查找课程' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "searchUser", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: '查找我的课程' }),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "searchMyCourse", null);
__decorate([
    common_1.Post(),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiOperation({ summary: '添加课程' }),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCourse]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    role_decorator_1.Roles('teacher', 'admin'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '更新课程' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createCourse]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    role_decorator_1.Roles('teacher', 'admin'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '删除课程' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "delete", null);
CoursesController = __decorate([
    swagger_1.ApiTags('课程'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Controller('courses'),
    __param(0, nestjs_typegoose_1.InjectModel(Course_model_1.Course)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], CoursesController);
exports.CoursesController = CoursesController;


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("@typegoose/typegoose/lib/types");;

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const common_1 = __webpack_require__(6);
const Roles = (...roles) => common_1.SetMetadata('roles', roles);
exports.Roles = Roles;


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const user_model_1 = __webpack_require__(9);
const common_1 = __webpack_require__(6);
const core_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(14);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
let RolesGuard = class RolesGuard {
    constructor(reflector, jwtService, userModel) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        return this.validate(request, roles);
    }
    async validate(request, roles) {
        let token = request.headers.authorization || '';
        token = token.replace(/bearer /i, '');
        const user = await this.jwtService.verifyAsync(token);
        if (!user)
            throw new common_1.UnauthorizedException();
        const role = await this.userModel.findById(user);
        if (roles.includes(role.role))
            return true;
        else
            return false;
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __param(2, nestjs_typegoose_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _c : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(6);
const users_controller_1 = __webpack_require__(36);
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(6);
const nestjs_typegoose_1 = __webpack_require__(8);
const user_model_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const roles_guard_1 = __webpack_require__(34);
const jwt_1 = __webpack_require__(14);
const role_decorator_1 = __webpack_require__(33);
class createUser {
}
__decorate([
    swagger_1.ApiProperty({ description: '用户名' }),
    __metadata("design:type", String)
], createUser.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '用户密码' }),
    __metadata("design:type", String)
], createUser.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '真实姓名' }),
    __metadata("design:type", String)
], createUser.prototype, "realname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createUser.prototype, "role", void 0);
let UsersController = class UsersController {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async index() {
        return await this.userModel.find();
    }
    async searchUser(id) {
        return await this.userModel.findById(id);
    }
    async searchUsername(username) {
        console.log(username);
        return await this.userModel.findOne({ username: username });
    }
    async create(createUser) {
        await this.userModel.create(createUser);
        return {
            success: true,
        };
    }
    async update(id, updateUser) {
        await this.userModel.findByIdAndUpdate(id, updateUser);
    }
    async delete(id) {
        await this.userModel.findByIdAndDelete(id);
    }
};
__decorate([
    common_1.Get('/allUsers'),
    role_decorator_1.Roles('teacher', 'admin'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '用户列表' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "index", null);
__decorate([
    common_1.Get(':id'),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '查找用户' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchUser", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiQuery({
        name: 'username',
    }),
    swagger_1.ApiOperation({ summary: '查找用户' }),
    __param(0, common_1.Query('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchUsername", null);
__decorate([
    common_1.Post(),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '注册用户' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    role_decorator_1.Roles('teacher', 'admin'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '更新用户' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createUser]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    role_decorator_1.Roles('teacher', 'admin'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '删除用户' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    swagger_1.ApiTags('用户'),
    common_1.Controller('users'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __param(1, nestjs_typegoose_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _b : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlocksModule = void 0;
const common_1 = __webpack_require__(6);
const blocks_controller_1 = __webpack_require__(38);
let BlocksModule = class BlocksModule {
};
BlocksModule = __decorate([
    common_1.Module({
        controllers: [blocks_controller_1.BlocksController],
    })
], BlocksModule);
exports.BlocksModule = BlocksModule;


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlocksController = void 0;
const Block_model_1 = __webpack_require__(13);
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
const role_decorator_1 = __webpack_require__(33);
const roles_guard_1 = __webpack_require__(34);
class createBlock {
}
__decorate([
    swagger_1.ApiProperty({ description: '课时名' }),
    __metadata("design:type", String)
], createBlock.prototype, "name", void 0);
let BlocksController = class BlocksController {
    constructor(blockModel) {
        this.blockModel = blockModel;
    }
    async index() {
        return await this.blockModel.find();
    }
    async searchBlock(id) {
        return await this.blockModel.findById(id);
    }
    async blockAmount(query) {
        const params = JSON.parse(query);
        const res = await this.blockModel.find().where(params.where);
        return res.length;
    }
    async create(createBlock) {
        await this.blockModel.create(createBlock);
        return {
            success: true,
        };
    }
    async update(id, updateBlock) {
        await this.blockModel.findByIdAndUpdate(id, updateBlock);
    }
    async delete(id) {
        await this.blockModel.findByIdAndDelete(id);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: '课时列表' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "index", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ summary: '查找课时' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "searchBlock", null);
__decorate([
    common_1.Get('amount/amount'),
    swagger_1.ApiOperation({ summary: '查找课时数量' }),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "blockAmount", null);
__decorate([
    common_1.Post(),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '添加课时' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBlock]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '更新课时' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createBlock]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '删除课时' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "delete", null);
BlocksController = __decorate([
    swagger_1.ApiTags('课时'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Controller('blocks'),
    __param(0, nestjs_typegoose_1.InjectModel(Block_model_1.Block)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], BlocksController);
exports.BlocksController = BlocksController;


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(40);
const auth_controller_1 = __webpack_require__(41);
const jwt_strategy_1 = __webpack_require__(42);
const local_strategy_1 = __webpack_require__(44);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [passport_1.PassportModule],
        controllers: [auth_controller_1.AuthController],
        providers: [local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");;

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const user_model_1 = __webpack_require__(9);
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(40);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(14);
class RegisterDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "realname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
class LoginDto {
}
__decorate([
    swagger_1.ApiProperty({ description: '用户名', example: 'admin2' }),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '密码', example: '123456' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
let AuthController = class AuthController {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async register(dto) {
        const { username, password, realname, role } = dto;
        const user = await this.userModel.create({
            username,
            password,
            realname,
            role,
        });
        return user;
    }
    async login(dto, req) {
        return {
            token: this.jwtService.sign(String(req.user._id)),
        };
    }
    async user(req) {
        return req.user;
    }
};
__decorate([
    common_1.Post('register'),
    swagger_1.ApiOperation({ summary: '注册' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    swagger_1.ApiOperation({ summary: '登录' }),
    common_1.UseGuards(passport_1.AuthGuard('local')),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Get('user'),
    swagger_1.ApiOperation({ summary: '获取个人信息' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    swagger_1.ApiTags('用户API'),
    __param(1, nestjs_typegoose_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _b : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const user_model_1 = __webpack_require__(9);
const passport_1 = __webpack_require__(40);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
const passport_jwt_1 = __webpack_require__(43);
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'jwt') {
    constructor(userModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 's123hasjhe123hkaosehdo12hjiejaskd4',
        });
        this.userModel = userModel;
    }
    async validate(id) {
        return await this.userModel.findById(id);
    }
};
JwtStrategy = __decorate([
    __param(0, nestjs_typegoose_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = require("passport-jwt");;

/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const user_model_1 = __webpack_require__(9);
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(40);
const types_1 = __webpack_require__(32);
const bcryptjs_1 = __webpack_require__(11);
const nestjs_typegoose_1 = __webpack_require__(8);
const passport_local_1 = __webpack_require__(45);
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy, 'local') {
    constructor(userModel) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
        this.userModel = userModel;
    }
    async validate(username, password) {
        const user = await this.userModel.findOne({ username }).select('+password');
        if (!user) {
            throw new common_1.BadRequestException('用户名不正确');
        }
        if (!bcryptjs_1.compareSync(password, user.password)) {
            throw new common_1.BadRequestException('密码不正确');
        }
        return user;
    }
};
LocalStrategy = __decorate([
    __param(0, nestjs_typegoose_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("passport-local");;

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsModule = void 0;
const common_1 = __webpack_require__(6);
const comments_controller_1 = __webpack_require__(47);
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    common_1.Module({
        controllers: [comments_controller_1.CommentsController],
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsController = void 0;
const Comment_model_1 = __webpack_require__(16);
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(40);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
let CommentsController = class CommentsController {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async index(query) {
        const params = JSON.parse(query);
        return await this.commentModel
            .find()
            .populate(['object', 'user'])
            .where(params.where)
            .setOptions(params);
    }
    async getAll() {
        return await this.commentModel.find();
    }
    async create(dto, req) {
        dto.user = req.user._id;
        return await this.commentModel.create(dto);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "index", null);
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getAll", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
CommentsController = __decorate([
    common_1.Controller('comments'),
    __param(0, nestjs_typegoose_1.InjectModel(Comment_model_1.Comment)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], CommentsController);
exports.CommentsController = CommentsController;


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadsModule = void 0;
const common_1 = __webpack_require__(6);
const threads_controller_1 = __webpack_require__(49);
let ThreadsModule = class ThreadsModule {
};
ThreadsModule = __decorate([
    common_1.Module({
        controllers: [threads_controller_1.ThreadsController]
    })
], ThreadsModule);
exports.ThreadsModule = ThreadsModule;


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadsController = void 0;
const Thread_model_1 = __webpack_require__(17);
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(40);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
const role_decorator_1 = __webpack_require__(33);
let ThreadsController = class ThreadsController {
    constructor(threadModel) {
        this.threadModel = threadModel;
    }
    async getAll() {
        return await this.threadModel.find();
    }
    async index(query) {
        const params = JSON.parse(query);
        return await this.threadModel
            .find()
            .populate(['object', 'user'])
            .where(params.where)
            .setOptions(params);
    }
    async getThread(id) {
        return await this.threadModel
            .findById(id)
            .populate(['object', 'user'])
            .limit(20);
    }
    async commentAmount(query) {
        const params = JSON.parse(query);
        const res = await this.threadModel.find().where(params.where);
        return res.length;
    }
    async createThread(dto, req) {
        dto.user = req.user._id;
        const res = await this.threadModel.create(dto);
        return res._id;
    }
    async delete(id) {
        await this.threadModel.findByIdAndDelete(id);
    }
    async update(id, update) {
        await this.threadModel.findByIdAndUpdate(id, update);
    }
};
__decorate([
    common_1.Get('all'),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "getAll", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "index", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "getThread", null);
__decorate([
    common_1.Get('amount/amount'),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "commentAmount", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "createThread", null);
__decorate([
    common_1.Delete(':id'),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '删除帖子' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "delete", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "update", null);
ThreadsController = __decorate([
    swagger_1.ApiTags('讨论区'),
    common_1.Controller('threads'),
    __param(0, nestjs_typegoose_1.InjectModel(Thread_model_1.Thread)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], ThreadsController);
exports.ThreadsController = ThreadsController;


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursewaresModule = void 0;
const common_1 = __webpack_require__(6);
const coursewares_controller_1 = __webpack_require__(51);
let CoursewaresModule = class CoursewaresModule {
};
CoursewaresModule = __decorate([
    common_1.Module({
        controllers: [coursewares_controller_1.CoursewaresController]
    })
], CoursewaresModule);
exports.CoursewaresModule = CoursewaresModule;


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursewaresController = void 0;
const Courseware_1 = __webpack_require__(18);
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
const role_decorator_1 = __webpack_require__(33);
class createCourseware {
}
__decorate([
    swagger_1.ApiProperty({ description: '课件名' }),
    __metadata("design:type", String)
], createCourseware.prototype, "name", void 0);
let CoursewaresController = class CoursewaresController {
    constructor(coursewareModel) {
        this.coursewareModel = coursewareModel;
    }
    async searchCoursewares(query) {
        const params = JSON.parse(query);
        return await this.coursewareModel
            .find()
            .populate(['course', 'user'])
            .where(params.where)
            .setOptions(params);
    }
    async amount(query) {
        const params = JSON.parse(query);
        const res = await this.coursewareModel
            .find()
            .where(params.where)
            .setOptions(params);
        return res.length;
    }
    async create(createCourseware) {
        await this.coursewareModel.create(createCourseware);
        return {
            success: true,
        };
    }
    async update(id, updateUser) {
        await this.coursewareModel.findByIdAndUpdate(id, updateUser);
    }
    async delete(id) {
        await this.coursewareModel.findByIdAndDelete(id);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursewaresController.prototype, "searchCoursewares", null);
__decorate([
    common_1.Get('amount'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursewaresController.prototype, "amount", null);
__decorate([
    common_1.Post(),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '添加课件' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCourseware]),
    __metadata("design:returntype", Promise)
], CoursewaresController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '更新课件' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createCourseware]),
    __metadata("design:returntype", Promise)
], CoursewaresController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    role_decorator_1.Roles('teacher'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: '删除课件' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursewaresController.prototype, "delete", null);
CoursewaresController = __decorate([
    swagger_1.ApiTags('课件'),
    common_1.Controller('coursewares'),
    __param(0, nestjs_typegoose_1.InjectModel(Courseware_1.Courseware)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], CoursewaresController);
exports.CoursewaresController = CoursewaresController;


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkModule = void 0;
const common_1 = __webpack_require__(6);
const work_controller_1 = __webpack_require__(53);
let WorkModule = class WorkModule {
};
WorkModule = __decorate([
    common_1.Module({
        controllers: [work_controller_1.WorkController]
    })
], WorkModule);
exports.WorkModule = WorkModule;


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkController = void 0;
const Work_model_1 = __webpack_require__(19);
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(40);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
class work {
}
__decorate([
    swagger_1.ApiProperty({ description: '标题' }),
    __metadata("design:type", String)
], work.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '创建用户' }),
    __metadata("design:type", String)
], work.prototype, "createUser", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '总分' }),
    __metadata("design:type", Number)
], work.prototype, "totalScore", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '所属课程' }),
    __metadata("design:type", String)
], work.prototype, "course", void 0);
let WorkController = class WorkController {
    constructor(workModel) {
        this.workModel = workModel;
    }
    async index() {
        return await this.workModel.find();
    }
    async delete(id) {
        return await this.workModel.findByIdAndDelete(id);
    }
    async getWork(query) {
        const params = JSON.parse(query);
        return await this.workModel.find().where(params.where).setOptions(params);
    }
    async searchWork(workId, query) {
        const params = JSON.parse(query);
        return await this.workModel.findById(workId).populate(params.populate);
    }
    async create(dto, req) {
        dto.createUser = req.user._id;
        return await this.workModel.create(dto);
    }
    async update(workId, dto, req) {
        dto.createUser = req.user._id;
        return await this.workModel.findByIdAndUpdate(workId, dto);
    }
};
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "index", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "delete", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "getWork", null);
__decorate([
    common_1.Get(':workId'),
    __param(0, common_1.Param('workId')), __param(1, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "searchWork", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [work, Object]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "create", null);
__decorate([
    common_1.Put(':workId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('workId')), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work, Object]),
    __metadata("design:returntype", Promise)
], WorkController.prototype, "update", null);
WorkController = __decorate([
    swagger_1.ApiTags('作业'),
    common_1.Controller('works'),
    __param(0, nestjs_typegoose_1.InjectModel(Work_model_1.Work)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], WorkController);
exports.WorkController = WorkController;


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectQuestionsModule = void 0;
const common_1 = __webpack_require__(6);
const select_questions_controller_1 = __webpack_require__(55);
let SelectQuestionsModule = class SelectQuestionsModule {
};
SelectQuestionsModule = __decorate([
    common_1.Module({
        controllers: [select_questions_controller_1.SelectQuestionsController]
    })
], SelectQuestionsModule);
exports.SelectQuestionsModule = SelectQuestionsModule;


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectQuestionsController = void 0;
const SelectQuestion_model_1 = __webpack_require__(20);
const common_1 = __webpack_require__(6);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
let SelectQuestionsController = class SelectQuestionsController {
    constructor(selectModel) {
        this.selectModel = selectModel;
    }
    async create(dto) {
        await this.selectModel.create(dto);
    }
    async update(id, dto) {
        await this.selectModel.findByIdAndUpdate(id, dto);
    }
    async index() {
        return await this.selectModel.find();
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SelectQuestionsController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SelectQuestionsController.prototype, "update", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SelectQuestionsController.prototype, "index", null);
SelectQuestionsController = __decorate([
    common_1.Controller('select-questions'),
    __param(0, nestjs_typegoose_1.InjectModel(SelectQuestion_model_1.SelectQuestion)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], SelectQuestionsController);
exports.SelectQuestionsController = SelectQuestionsController;


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JudgmentQuestionsModule = void 0;
const common_1 = __webpack_require__(6);
const judgment_questions_controller_1 = __webpack_require__(57);
let JudgmentQuestionsModule = class JudgmentQuestionsModule {
};
JudgmentQuestionsModule = __decorate([
    common_1.Module({
        controllers: [judgment_questions_controller_1.JudgmentQuestionsController]
    })
], JudgmentQuestionsModule);
exports.JudgmentQuestionsModule = JudgmentQuestionsModule;


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JudgmentQuestionsController = void 0;
const JudgmentQuestion_model_1 = __webpack_require__(21);
const common_1 = __webpack_require__(6);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
let JudgmentQuestionsController = class JudgmentQuestionsController {
    constructor(judgmentModel) {
        this.judgmentModel = judgmentModel;
    }
    async create(dto) {
        await this.judgmentModel.create(dto);
    }
    async update(id, dto) {
        await this.judgmentModel.findByIdAndUpdate(id, dto);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JudgmentQuestionsController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JudgmentQuestionsController.prototype, "update", null);
JudgmentQuestionsController = __decorate([
    common_1.Controller('judgment-questions'),
    __param(0, nestjs_typegoose_1.InjectModel(JudgmentQuestion_model_1.JudgmentQuestion)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], JudgmentQuestionsController);
exports.JudgmentQuestionsController = JudgmentQuestionsController;


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnswerModule = void 0;
const common_1 = __webpack_require__(6);
const answer_controller_1 = __webpack_require__(59);
let AnswerModule = class AnswerModule {
};
AnswerModule = __decorate([
    common_1.Module({
        controllers: [answer_controller_1.AnswerController]
    })
], AnswerModule);
exports.AnswerModule = AnswerModule;


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnswerController = void 0;
const Answer_model_1 = __webpack_require__(22);
const JudgmentQuestion_model_1 = __webpack_require__(21);
const SelectQuestion_model_1 = __webpack_require__(20);
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(40);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
let AnswerController = class AnswerController {
    constructor(answerModel, selectModel, judgmentModel) {
        this.answerModel = answerModel;
        this.selectModel = selectModel;
        this.judgmentModel = judgmentModel;
    }
    async create(dto, req) {
        dto.user = req.user._id;
        const selectTrue = await this.selectModel
            .where({ object: dto.object })
            .select('+trueItem');
        const judgmentTrue = await this.judgmentModel
            .where({ object: dto.object })
            .select('+answer');
        for (let i = 0; i < selectTrue.length; i++) {
            if (selectTrue[i].trueItem == dto.select[i]) {
                dto.userScore += selectTrue[i].score;
            }
        }
        for (let i = 0; i < judgmentTrue.length; i++) {
            if (judgmentTrue[i].answer == dto.judgment[i]) {
                dto.userScore += judgmentTrue[i].score;
            }
        }
        console.log(judgmentTrue);
        console.log(dto);
        await this.answerModel.create(dto);
        return {
            totalScore: dto.totalScore,
            scored: dto.userScore,
        };
    }
    async index(query) {
        const params = JSON.parse(query);
        const res = await this.answerModel.find().where(params.where);
        console.log(res.length);
        if (res.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async getScore(query) {
        const params = JSON.parse(query);
        const res = await this.answerModel.find().where(params.where);
        return res.length > 0
            ? {
                score: res[0].userScore,
                totalScore: res[0].totalScore,
            }
            : -1;
    }
    async getAllStudentScore(query) {
        const params = JSON.parse(query);
        const res = await this.answerModel
            .find()
            .where(params.where)
            .setOptions(params);
        return res;
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "index", null);
__decorate([
    common_1.Get('score'),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getScore", null);
__decorate([
    common_1.Get('allStudentScore'),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAllStudentScore", null);
AnswerController = __decorate([
    swagger_1.ApiTags('答案'),
    common_1.Controller('answer'),
    __param(0, nestjs_typegoose_1.InjectModel(Answer_model_1.Answer)),
    __param(1, nestjs_typegoose_1.InjectModel(SelectQuestion_model_1.SelectQuestion)),
    __param(2, nestjs_typegoose_1.InjectModel(JudgmentQuestion_model_1.JudgmentQuestion)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object, typeof (_b = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _b : Object, typeof (_c = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _c : Object])
], AnswerController);
exports.AnswerController = AnswerController;


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExamModule = void 0;
const common_1 = __webpack_require__(6);
const exam_controller_1 = __webpack_require__(61);
let ExamModule = class ExamModule {
};
ExamModule = __decorate([
    common_1.Module({
        controllers: [exam_controller_1.ExamController]
    })
], ExamModule);
exports.ExamModule = ExamModule;


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExamController = void 0;
const Exam_model_1 = __webpack_require__(23);
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(40);
const swagger_1 = __webpack_require__(2);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
class exam {
}
__decorate([
    swagger_1.ApiProperty({ description: '标题' }),
    __metadata("design:type", String)
], exam.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '创建用户' }),
    __metadata("design:type", String)
], exam.prototype, "createUser", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '总分' }),
    __metadata("design:type", Number)
], exam.prototype, "totalScore", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '所属课程' }),
    __metadata("design:type", String)
], exam.prototype, "course", void 0);
__decorate([
    swagger_1.ApiProperty({ description: '时长' }),
    __metadata("design:type", String)
], exam.prototype, "time", void 0);
let ExamController = class ExamController {
    constructor(examModel) {
        this.examModel = examModel;
    }
    async index() {
        return await this.examModel.find();
    }
    async getWork(query) {
        const params = JSON.parse(query);
        return await this.examModel.find().where(params.where).setOptions(params);
    }
    async delete(id) {
        return await this.examModel.findByIdAndDelete(id);
    }
    async searchWork(examId, query) {
        const params = JSON.parse(query);
        return await this.examModel.findById(examId).populate(params.populate);
    }
    async create(dto, req) {
        dto.createUser = req.user._id;
        return await this.examModel.create(dto);
    }
    async update(examId, dto, req) {
        dto.createUser = req.user._id;
        return await this.examModel.findByIdAndUpdate(examId, dto);
    }
};
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "index", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getWork", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "delete", null);
__decorate([
    common_1.Get(':examId'),
    __param(0, common_1.Param('examId')), __param(1, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "searchWork", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "create", null);
__decorate([
    common_1.Put(':examId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('examId')), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "update", null);
ExamController = __decorate([
    common_1.Controller('exam'),
    __param(0, nestjs_typegoose_1.InjectModel(Exam_model_1.Exam)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], ExamController);
exports.ExamController = ExamController;


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddCourseModule = void 0;
const common_1 = __webpack_require__(6);
const add_course_controller_1 = __webpack_require__(63);
let AddCourseModule = class AddCourseModule {
};
AddCourseModule = __decorate([
    common_1.Module({
        controllers: [add_course_controller_1.AddCourseController]
    })
], AddCourseModule);
exports.AddCourseModule = AddCourseModule;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddCourseController = void 0;
const AddCourse_model_1 = __webpack_require__(24);
const common_1 = __webpack_require__(6);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
let AddCourseController = class AddCourseController {
    constructor(addCourseModel) {
        this.addCourseModel = addCourseModel;
    }
    async index(query) {
        const params = JSON.parse(query);
        const res = await this.addCourseModel
            .find()
            .where(params.where)
            .setOptions(params);
        return res;
    }
    async create(dto) {
        await this.addCourseModel.create(dto);
    }
    async deletek(query) {
        const params = JSON.parse(query);
        return await this.addCourseModel
            .remove()
            .where(params.where)
            .setOptions(params);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddCourseController.prototype, "index", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddCourseController.prototype, "create", null);
__decorate([
    common_1.Delete(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddCourseController.prototype, "deletek", null);
AddCourseController = __decorate([
    common_1.Controller('add-course'),
    __param(0, nestjs_typegoose_1.InjectModel(AddCourse_model_1.AddCourse)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], AddCourseController);
exports.AddCourseController = AddCourseController;


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatementModule = void 0;
const common_1 = __webpack_require__(6);
const statement_controller_1 = __webpack_require__(65);
let StatementModule = class StatementModule {
};
StatementModule = __decorate([
    common_1.Module({
        controllers: [statement_controller_1.StatementController]
    })
], StatementModule);
exports.StatementModule = StatementModule;


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatementController = void 0;
const Statement_model_1 = __webpack_require__(15);
const common_1 = __webpack_require__(6);
const types_1 = __webpack_require__(32);
const nestjs_typegoose_1 = __webpack_require__(8);
let StatementController = class StatementController {
    constructor(statementModel) {
        this.statementModel = statementModel;
    }
    async index() {
        return await this.statementModel.find();
    }
    async userStatement(query) {
        const params = JSON.parse(query);
        const res = await this.statementModel
            .find({
            'actor.account.id': params.where.user,
            'object.definition.course': params.where.course,
        })
            .sort({ _id: -1 });
        return res;
    }
    async blockStatement(query) {
        const params = JSON.parse(query);
        const res = await this.statementModel
            .find({
            'object.definition.course': params.where.course,
            'verb.display.en_US': 'watched',
        })
            .sort({ _id: -1 });
        return res;
    }
    async courseStatement(query) {
        const params = JSON.parse(query);
        console.log(params.where.course);
        const res = await this.statementModel
            .find({
            'object.definition.course': params.where.course,
        })
            .sort({ _id: -1 });
        return res;
    }
    async StatementAmount(query) {
        const params = JSON.parse(query);
        const res = await this.statementModel
            .find({
            'actor.account.id': params.where.user,
            'object.definition.course': params.where.course,
        })
            .sort({ _id: -1 });
        return res.length;
    }
    async create(dto) {
        await this.statementModel.create(dto);
    }
};
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatementController.prototype, "index", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StatementController.prototype, "userStatement", null);
__decorate([
    common_1.Get('video'),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StatementController.prototype, "blockStatement", null);
__decorate([
    common_1.Get('courseStatement'),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StatementController.prototype, "courseStatement", null);
__decorate([
    common_1.Get('amount'),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StatementController.prototype, "StatementAmount", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatementController.prototype, "create", null);
StatementController = __decorate([
    common_1.Controller('statement'),
    __param(0, nestjs_typegoose_1.InjectModel(Statement_model_1.Statement)),
    __metadata("design:paramtypes", [typeof (_a = typeof types_1.ModelType !== "undefined" && types_1.ModelType) === "function" ? _a : Object])
], StatementController);
exports.StatementController = StatementController;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;