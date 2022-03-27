import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import UserInfo from "../views/UserInfo.vue";
import Route from "/@views/Route.vue";
import LogOut from "/@views/LogOut.vue";
import ProblemReport from "/@views/problemReport/ProblemReport.vue";
import ProblemOrder from "/@views/problemOrder/ProblemOrder.vue";
import ProblemDetail from "/@views/problemDetail/ProblemDetail.vue";
import { Local } from "/@utils/storage";
import { useStore } from "vuex";

const routes = [
  {
    path: "/",
    name: "route",
    component: Route,
  },
  {
    path: "/logOut",
    name: "LogOut",
    component: LogOut,
  },
  {
    path: "/problemReport",
    name: "problemReport",
    component: ProblemReport,
  },
  {
    path: "/problemOrder",
    name: "problemOrder",
    component: ProblemOrder,
  },
  {
    path: "/problemDetail",
    name: "problemDetail",
    component: ProblemDetail,
  },
  {
    path: "/register",
    name: "register",
    meta: {
      showBack: false,
    },
    component: Register,
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
  if (from.name === null) {
    // 第一次打开或刷新
    if (to.query.code) {
      window.sessionStorage.setItem("wxCode", to.query.code);
    }
  }
  if (to.path == "/register") {
    const userInfo = Local.get("userInfo");
    if (userInfo.Id) {
      next({ path: "/userInfo" });
    }
  }

  next();
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
