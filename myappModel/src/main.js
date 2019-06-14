// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from './http/index'
Vue.prototype.$post = axios.post;
Vue.prototype.$get = axios.get;
Vue.prototype.$patch = axios.patch;
Vue.prototype.$put = axios.put;
Vue.prototype.$del = axios.del;

//按需引入Vant组件
import { Toast, Loading } from 'vant';
import 'vant/lib/index.css';
Vue.use(Toast).use(Loading);

//淘宝的弹性布局 rem与页面比列为10 ， 可根据自己实际情况下载修改代码
import 'lib-flexible'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
