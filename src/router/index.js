import { createRouter, createWebHistory } from "vue-router";
import { Session, Local } from "/@utils/storage";
import { loadOpenId, loadUserInfo } from "/@api/api";
import { Toast } from "vant";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "route",
    redirect: "/register",
    // component: Route,
  },
  {
    path: "/logOut",
    name: "LogOut",
    meta: {
      showBack: false,
    },
    component: () => import("/@views/LogOut.vue"),
  },
  {
    path: "/problemReport",
    name: "problemReport",
    meta: {
      showBack: false,
    },
    component: () => import("/@views/problemReport/ProblemReport.vue"),
  },
  {
    path: "/problemOrder",
    name: "problemOrder",
    meta: {
      showBack: false,
    },
    component: () => import("/@views/problemOrder/ProblemOrder.vue"),
  },
  {
    path: "/problemDetail",
    name: "problemDetail",
    meta: {
      showBack: true,
    },
    component: () => import("/@views/problemDetail/ProblemDetail.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      showBack: false,
    },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/userInfo",
    name: "userInfo",
    meta: {
      showBack: false,
    },
    component: () => import("../views/UserInfo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
  });
  const code = to.query.code;
next()
  const openId = Session.get("openId");
  // 首次进入
  // if (code) {
  //   const openIdRes = await loadOpenId(code);
  //   if (!openIdRes.Success) {
  //     Toast.fail(openIdRes.Msg);
  //     return next({ path: "/register", replace: true });
  //   }
  //   Session.set("openId", openIdRes.Data.openid || "");
  //   store.dispatch("setOpenId", openIdRes.Data.openid);
  //   const userRes = await loadUserInfo(openIdRes.Data.openid);
  //   Local.set("userInfo", userRes.Data || {});
  //   store.dispatch("setUserData", userRes.Data);
  //   if (!userRes.Data.Id) {
  //     if (to.path == "/register") {
  //       next();
  //     } else {
  //       next({ path: "/register", replace: true });
  //     }
  //   } else {
  //     if (to.path == "/register") {
  //       Toast('您已注册！')
  //       next({ path: "/userInfo", replace: true });
  //     } else {
  //       next();
  //     }
  //   }
  // } else {
  //   // 刷新
  //   if (openId) {
  //     const userRes = await loadUserInfo(openId);
  //     Local.set("userInfo", userRes.Data || {});
  //     store.dispatch("setUserData", userRes.Data || {});
  //     // 没有用户信息 去注册
  //     if (!userRes.Data.Id) {
  //       if (to.path == "/register") {
  //         next();
  //       } else {
  //         next({ path: "/register", replace: true });
  //       }
  //     } else {
  //       if (to.path == "/register") {
  //         next({ path: "/userInfo", replace: true });
  //       } else {
  //         next();
  //       }
  //     }
  //   } else {
  //     if (to.path == "/register") {
  //       next();
  //     } else {
  //       next({ path: "/register", replace: true });
  //     }
  //   }
  // }
});

export default router;
