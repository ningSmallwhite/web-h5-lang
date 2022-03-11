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

export default router;
