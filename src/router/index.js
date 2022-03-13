import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Register from "../views/Register.vue";
import Route from "/@views/Route.vue";
import LogOut from "/@views/LogOut.vue";
import ProblemReport from "/@views/problemReport/ProblemReport.vue";
import ProblemOrder from "/@views/problemOrder/ProblemOrder.vue";
import ProblemDetail from "/@views/problemDetail/ProblemDetail.vue";

const routes = [
  {
    path: "/",
    name: "route",
    component: Route
  },
  {
    path: "/logOut",
    name: "LogOut",
    component: LogOut
  },
  {
    path: "/problemReport",
    name: "problemReport",
    component: ProblemReport
  },
  {
    path: "/problemOrder",
    name: "problemOrder",
    component: ProblemOrder
  },
  {
    path: "/problemDetail",
    name: "problemDetail",
    component: ProblemDetail
  },
  {
    path: "/register",
    name: "register",
    meta: {
      showBack: false
    },
    component: Register
  },
  {
    path: "/userInfo",
    name: "userInfo",
    meta: {
      showBack: false
    },
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // 用来记录跳转到aws知乎每次返回的页面
  window.sessionStorage.setItem("backFullPath", from.fullPath);

  if (from.name === null) {
    // 第一次打开或刷新
    if (to.query.code) {
      window.sessionStorage.setItem("wxCode", to.query.code);
    }
  }

  let token = window.sessionStorage.getItem("authorization") || null;
  let openid = window.localStorage.getItem("openid") || null;
  if (to.meta.needLogin && !token && !openid) {
    next({ path: "/login" });
  } else {
    next();
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
