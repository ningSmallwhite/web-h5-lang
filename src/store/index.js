import { createStore, useStore } from "vuex";

export default createStore({
  state: {
    userInfo: {}, // 个人信息
    openId: window.sessionStorage.openId || null,
  },
  mutations: {
    SET_USER_DATA(state, value) {
      state.userInfo = value;
      console.log("SET_USER_DATA", state.userInfo);
    },
    SET_OPENID(state,value) {
      state.openId = value
    }
  },
  actions: {
    setUserData: ({ commit, state }, value) => {
      console.log(22);
      commit("SET_USER_DATA", value);
    },
    setOpenId: ({ commit, state }, value) => {
      commit("SET_OPENID", value);
    },
  },
});

export const store = useStore()