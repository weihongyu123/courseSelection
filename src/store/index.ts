import { createStore } from 'vuex'
import { login } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';

export default createStore({
  state: {
    token: getToken(),
    name: '',
  },
  getters: {
    token (state, getters) {
      return state.token
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
  },
  actions: {
    async login({ commit }, userInfo) {
      const { userName, password } = userInfo;
      return login({ userName: userName.trim(), password: password }).then(response => {
        const { data } = response;
        commit('SET_TOKEN', data.token);
        setToken(data.token);
      }).catch(error => {
        throw new Error()
      });
    }
  },

  modules: {
  }
})

