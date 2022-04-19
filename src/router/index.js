import { createRouter, createWebHistory } from "vue-router";
import { Local } from "/@utils/storage";
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

  let code = "";
  if (to.query.code) {
    code = to.query.code;
    // 首次进入之后就没用了 清掉
    to.query.code = "";
  }

  const openId = Local.get("openId");
  const usInfo = Local.get("userInfo");
  if (usInfo && usInfo.Id && openId) {
    // 有用户信息和openId 可以通过
    if (to.path == "/register") {
      Toast("您已注册！");
      next({ path: "/userInfo", replace: true });
    } else {
      next();
    }
  } else if (openId) {
    const userRes = await loadUserInfo(openId);
    Local.set("userInfo", userRes.Data || {});
    store.dispatch("setUserData", userRes.Data || {});
    console.log("userRes.Data.Id", userRes.Data.Id);
    if (userRes.Data.Id) {
      if (to.path == "/register") {
        Toast("您已注册！");
        next({ path: "/userInfo", replace: true });
      } else {
        next();
      }
    } else {
      if (to.path == "/register") {
        next();
      } else {
        next({ path: "/register", replace: true });
      }
    }
  } else if (code) {
    const openIdRes = await loadOpenId(code);
    if (!openIdRes.Success) {
      Toast.fail(openIdRes.Msg);
      return next({ path: "/register", replace: true });
    }
    Local.set("openId", openIdRes.Data.openid || "");
    store.dispatch("setOpenId", openIdRes.Data.openid);
    const userRes = await loadUserInfo(openIdRes.Data.openid);
    Local.set("userInfo", userRes.Data || {});
    store.dispatch("setUserData", userRes.Data);
    if (userRes.Data.Id) {
      if (to.path == "/register") {
        Toast("您已注册！");
        next({ path: "/userInfo", replace: true });
      } else {
        next();
      }
    } else {
      if (to.path == "/register") {
        next();
      } else {
        next({ path: "/register", replace: true });
      }
    }
  } else {
    if (to.path == "/register") {
      next();
    } else {
      next({ path: "/register", replace: true });
    }
  }
});

export default router;
