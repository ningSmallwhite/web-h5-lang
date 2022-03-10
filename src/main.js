import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Vant from "vant";
import "vant/lib/index.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .mount("#app");
