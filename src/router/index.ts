import Router, { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Vue from 'vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../layout/BasicLayout.vue'),
    meta: { title: 'menu.home' },
    redirect: '/system/teacher',
    children: [
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
        component: () => import(/* webpackChunkName: "about" */ '../views/teacher/Index.vue'),
        children: [
          {
            path: 'info',
            name: '教师信息',
            component: () => import(/* webpackChunkName: "about" */ '../views/teacher/Info.vue'),
          },
          {
            path: 'enterResults',
            name: '录入成绩',
            component: () => import(/* webpackChunkName: "about" */ '../views/teacher/enterResults.vue'),
          },
          {
            path: 'open',
            name: '开设课程',
            component: () => import(/* webpackChunkName: "about" */ '../views/teacher/Open.vue'),
          },
        ],
      },
      {
        path: '/student',
        name: '学生模块',
        component: () => import(/* webpackChunkName: "about" */ '../views/student/Index.vue'),
        children: [
          {
            path: 'info',
            name: '学生信息',
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
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "about" */ '../layout/UserLayout.vue'),
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
