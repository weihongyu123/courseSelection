import { createStore } from 'vuex'
import { login } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { RouteRecordRaw } from 'vue-router'
import { routes } from "../router";

const mapMenus = (menus: string[], router?: RouteRecordRaw[], parentPath?: string) => {
  if (!router) router = routes;

  const menu: RouteRecordRaw[] = [];
  router.forEach(v => {
    const fullPath = (parentPath || '') + v.path
    if (menus.includes(fullPath)) {
      if (Array.isArray(v.children) && v.children.length > 0) {
        v.children = mapMenus(menus, v.children, fullPath)
      }
      menu.push(v)
    }
  })
  return menu
};

export default createStore<{
  menus: RouteRecordRaw[],
  [key: string]: any,
  teacherId: number | undefined,
  studentId: number | undefined,
}>({
  state: {
    token: getToken(),
    type: '',
    userName: '',
    menus: [],
    teacherId: undefined,
    studentId: undefined,
  },
  getters: {
    token(state, getters) {
      return state.token
    }
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data.token;
      state.type = data.type;

      if (data.type === 1) {
        const menu = [
          '/',
          '/teacher',
          '/course',
          '/student',
        ]
        state.menus = mapMenus(menu)
      } else if (data.type === 2) {
        const menu = [
          '/',
          '/teacherInfo',
          '/enterResults',
          '/open',
        ]
        state.menus = mapMenus(menu)
      } else if (data.type === 3) {
        const menu = [
          '/',
          '/studentInfo',
          '/selection',
          '/score',
        ]
        state.menus = mapMenus(menu)
      }

    },
    SET_NAME: (state, userName) => {
      state.userName = userName;
    },

    SET_INFO: (state, info) => {
      state.teacherId = info.teacherId;
      state.studentId = info.studentId;
    },
  },
  actions: {
    async login({ commit }, userInfo) {
      const { userName, password } = userInfo;
      return login({ userName: userName.trim(), password: password }).then(response => {
        const { data } = response;
        commit('SET_TOKEN', data);
        commit('SET_INFO', data);
        setToken(data.token);
      }).catch(error => {
        throw new Error()
      });
    }
  },

  modules: {
  }
})

