import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import CoursePage from '../views/CoursePage'
import Login from '../views/Login'
import Video from '../views/Video.vue'
import Debate from '../views/Debate.vue'
import CreateThread from '../views/CreateThread.vue'
import Thread from '../views/Thread.vue'
import Courseware from '../views/Courseware.vue'
import Work from '../views/Work.vue'
import CreateWork from '../views/CreateWork.vue'
import EditWork from '../views/EditWork.vue'
import WorkPage from '../views/WorkPage.vue'
import FinishWork from '../views/FinishWork.vue'
import Exam from '../views/Exam.vue'
import CreateExam from '../views/CreateExam.vue'
import EidtExam from '../views/EidtExam.vue'
import ExamPage from '../views/ExamPage.vue'
import FinishExam from '../views/FinishExam.vue'
import MyCourse from '../views/MyCourse.vue'
import Statement from '../views/Statement.vue'
import Admin from '../views/Admin.vue'
import AdminUser from '../views/AdminUser.vue'
import AdminCourse from '../views/AdminCourse.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, meta: { isPublic: true } },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: async (to, from, next) => {
      if (router.app.$options.store.state.user.role != 'admin') {
        next('/');
      }
      else {
        next();
      }
    },
    children:[
      {
        path: 'adminUser',
        name: 'adminUser',
        component: AdminUser,
      },
      {
        path: 'adminCourse',
        name: 'adminCourse',
        component: AdminCourse,
      },
    ]
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    beforeEnter: async (to, from, next) => {
      if (router.app.$options.store.state.user.role == 'admin') {
        next('/admin');
      }
      else {
        next();
      }
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,

      },
      {
        path: '/course/:courseId/video',
        component: CoursePage,
        props: true,
        children: [
          {
            path: '/course/:courseId/video',
            component: Video,
            props: true,
            meta: { key: '1' }
          },
          {
            path: '/course/:courseId/debate',
            component: Debate,
            props: true,
            meta: { key: '2' }
          },
          {
            path: '/course/:courseId/debate/createThread',
            component: CreateThread,
            props: true,
            meta: { key: '2' }
          },
          {
            path: '/course/:courseId/debate/thread/:threadId',
            component: Thread,
            props: true,
            meta: { key: '2' }
          },
          {
            path: '/course/:courseId/courseware',
            component: Courseware,
            props: true,
            meta: { key: '3' }
          },
          {
            path: '/course/:courseId/work',
            component: Work,
            props: true,
            meta: { key: '4' }
          },
          {
            path: '/course/:courseId/work/workPage/:workId',
            component: WorkPage,
            props: true,
            meta: { key: '4' },
            beforeEnter: async (to, from, next) => {
              const { params } = to;
              const res = await Vue.prototype.$http.get(`answer`, {
                params: {
                  query: {
                    where: {
                      work: params.workId,
                      user: router.app.$options.store.state.user._id,
                    },
                  },
                },
              })
              if (res.data == true) {
                next(`/course/${params.courseId}/work/finishWork/${params.workId}`);
              }
              else {
                next();
              }
            }
          },
          {
            path: '/course/:courseId/work/createWork',
            component: CreateWork,
            props: true,
            meta: { key: '4' }
          },
          {
            path: '/course/:courseId/work/editWork/:workId',
            component: EditWork,
            props: true,
            meta: { key: '4' }
          },
          {
            path: '/course/:courseId/work/finishWork/:workId',
            component: FinishWork,
            props: true,
            meta: { key: '4' }
          },
          {
            path: '/course/:courseId/exam',
            component: Exam,
            props: true,
            meta: { key: '5' }
          },
          {
            path: '/course/:courseId/exam/createExam',
            component: CreateExam,
            props: true,
            meta: { key: '5' }
          },
          {
            path: '/course/:courseId/exam/eidtExam/:examId',
            component: EidtExam,
            props: true,
            meta: { key: '5' }
          },
          {
            path: '/course/:courseId/exam/examPage/:examId',
            component: ExamPage,
            props: true,
            meta: { key: '5' },
            beforeEnter: async (to, from, next) => {
              const { params } = to;
              const res = await Vue.prototype.$http.get(`answer`, {
                params: {
                  query: {
                    where: {
                      work: params.examId,
                      user: router.app.$options.store.state.user._id,
                    },
                  },
                },
              })
              if (res.data == true) {
                next(`/course/${params.courseId}/exam/finishExam/${params.workId}`);
              }
              else {
                next();
              }
            }
          },
          {
            path: '/course/:courseId/exam/finishExam/:examId',
            component: FinishExam,
            props: true,
            meta: { key: '5' }
          },
          {
            path: '/course/:courseId/statement',
            component: Statement,
            props: true,
            meta: { key: '6' },
            beforeEnter: (to, from, next) => {
              if (router.app.$options.store.state.user.role === 'student') {
                next(`/`);
              }
              next();
            }
          },
        ]
      },
      { path: '/myCourse', component: MyCourse }
    ]
  },

]
const router = new VueRouter({
  routes
})
router.beforeEach(async (to, from, next) => {
  if (!to.meta.isPublic && !Vue.$cookies.get('token')) {
    return next('/login')
  }
  else if (Vue.$cookies.get('token')) {
    const res = await Vue.prototype.$http.get("/auth/user");
    router.app.$options.store.commit('SET_USER', res.data);
    next()
  }
  else {
    next()
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
