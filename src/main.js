// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./vuex/store"; //  引入vuex实例

/**Mock模拟数据  开始 */
// import Mock from "./mock";
// Mock.start();

/**Mock模拟数据   结束 */

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store, //注入
  template: "<App/>",
  components: {
    App //
  }
});
