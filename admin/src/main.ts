import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import "./plugins/element";
import "./plugins/avue";
import router from "./router";

Vue.config.productionTip = false;

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});
Vue.prototype.$httpajax = http; //avue上传方法需要
Vue.prototype.$http = http;

import EleForm from "vue-ele-form";
Vue.use(EleForm);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
