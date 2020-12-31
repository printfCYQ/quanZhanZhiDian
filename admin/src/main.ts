import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import "./plugins/element";
import "./plugins/avue";
import router from "./router";

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000",
});

import EleForm from "vue-ele-form";
Vue.use(EleForm);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
