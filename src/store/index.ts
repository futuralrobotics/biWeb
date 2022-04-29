import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // username: "zhuangzi200323@163.com",
    username: window.localStorage.username,
    token: window.localStorage.token,
    roleId: window.localStorage.roleId,
    userId: window.localStorage.userId,
    robotType: [],
    role: [],
    countryCode: []
  },
  mutations: {
    SET_USERNAME(state: any, data: string) {
      state.username = data;
      window.localStorage.setItem("username", data)
    },
    SET_TOKEN(state: any, data: string) {
      state.token = data;
      window.localStorage.setItem("token", data);
    },
    SET_ROLEID(state: any, data: string) {
      state.roleId = data;
      window.localStorage.setItem("roleId", data);
    },
    SET_USERID(state: any, data: string) {
      state.userId = data;
      window.localStorage.setItem("userId", data);
    },
    SET_ROBOT_TYPE(state: any, data: any) {
      state.robotType = data;
    },
    SET_ROLE(state: any, data: any) {
      state.role = data;
    },
    SET_COUNTRY_CODE(state: any, data: any) {
      state.countryCode = data;
    },
  },
  actions: {
  },
  modules: {
  }
})
