import { createRouter, createWebHistory } from "vue-router";
// import Register from "../views/Register.vue";
// import UserInfo from "../views/UserInfo.vue";
// import Route from "/@views/Route.vue";
// import LogOut from "/@views/LogOut.vue";
// import ProblemReport from "/@views/problemReport/ProblemReport.vue";
// import ProblemOrder from "/@views/problemOrder/ProblemOrder.vue";
// import ProblemDetail from "/@views/problemDetail/ProblemDetail.vue";
import { useStore } from "vuex";
import { Session, Local } from "/@utils/storage";

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
    component: () => import("/@views/LogOut.vue"),
  },
  {
    path: "/problemReport",
    name: "problemReport",
    component: () => import("/@views/problemReport/ProblemReport.vue"),
  },
  {
    path: "/problemOrder",
    name: "problemOrder",
    component: () => import("/@views/problemOrder/ProblemOrder.vue"),
  },
  {
    path: "/problemDetail",
    name: "problemDetail",
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

const store = useStore();
router.beforeEach((to, from, next) => {
  console.log(to);
  // if (from.name === null) {
    // 第一次打开或刷新
    if (to.query.code) {
      Local.set("wxCode", to.query.code);
    }
  // }
  const openId = Session.get("openId");
  const userInfo = Local.get("userInfo");
  console.log(openId, userInfo);
  console.log(112);
  // next();
  if (openId && userInfo && userInfo.UserName) {
    if (to.path == "/register") {
      next({ path: "/userInfo" });
    } else {
      next();
    }
  } else {
    if (to.path == "/register") {
      next();
    } else next({ path: "/register" });
  }
});

// 微信api要用到的url地址iOS和Android端有异
const ua = window.navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  let wxConfigUrl = "";
  router.afterEach(() => {
    // 微信浏览器的时候
    if (window.__wxjs_is_wkwebview) {
      // iOS
      if (wxConfigUrl == "") {
        wxConfigUrl = location.href;
      }
    } else {
      // Android
      wxConfigUrl = location.href;
    }
    window.sessionStorage.setItem("wxConfigUrl", wxConfigUrl);
  });
}

export default router;
