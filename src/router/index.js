import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Register from "../views/Register.vue";

const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };
const routes = [
  {
    path: "/",
    redirect: "/register"
    // component: Register
  },
  {
    path: "/hello",
    name: "HelloWorld",
    component: HelloWorld
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/about",
    name: "About",
    component: "<div>About</div>"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
