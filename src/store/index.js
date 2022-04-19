import { createStore, useStore } from "vuex";
import { Session, Local } from "/@utils/storage";

export default createStore({
  state: {
    userInfo: Local.get("userInfo") || {}, // 个人信息
    openId: Local.get("openId") || null,
  },
  mutations: {
    SET_USER_DATA(state, value) {
      state.userInfo = value;
    },
    SET_OPENID(state, value) {
      state.openId = value;
    },
  },
  actions: {
    setUserData: ({ commit, state }, value) => {
      commit("SET_USER_DATA", value);
    },
    setOpenId: ({ commit, state }, value) => {
      commit("SET_OPENID", value);
    },
  },
});

export const store = useStore();
