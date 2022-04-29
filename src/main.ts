import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/app.less';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/style/rewrite.less';
import moment from "moment";

moment.defaultFormat = "YYYY/MM/DD h:mm A";
Vue.prototype.$moment = moment;


Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
