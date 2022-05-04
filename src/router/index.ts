import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentInfo from '../views/student/Info.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: '系统模块',
    component: () => import(/* webpackChunkName: "about" */ '../views/system/Index.vue'),
    children: [
      {
        path: 'teacher',
        name: '教师管理',
        component: () => import(/* webpackChunkName: "about" */ '../views/system/Teacher.vue'),
      },
      {
        path: 'course',
        name: '课程管理',
        component: () => import(/* webpackChunkName: "about" */ '../views/system/Course.vue'),
      },
      {
        path: 'student',
        name: '学生管理',
        component: () => import(/* webpackChunkName: "about" */ '../views/system/Student.vue'),
      },
    ],
  },
  {
    path: '/teacher',
    name: '教师模块',
    component: HomeView,
  },
  {
    path: '/student',
    name: '学生模块',
    component: () => import(/* webpackChunkName: "about" */ '../views/student/Index.vue'),
    children: [
      {
        path: 'info',
        name: '个人信息',
        component: () => import(/* webpackChunkName: "about" */ '../views/student/Info.vue'),
      },
      {
        path: 'selection',
        name: '选课中心',
        component: () => import(/* webpackChunkName: "about" */ '../views/student/Selection.vue'),
      },
      {
        path: 'score',
        name: '成绩查询',
        component: () => import(/* webpackChunkName: "about" */ '../views/student/Score.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
