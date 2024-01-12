import Vue from "vue";
import App from "./App.vue";
// 将自动注册所有组件为全局组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "axios";

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
