/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import router from './router';

// 开发版
import emui from '../../src/index';
import '../../src/styles/emui.scss';

// 生产版
// import emui from '../../dist/emui-esm';
// import '../../dist/css/emui.css';

Vue.use(VueRouter);
Vue.use(emui);

// 开启debug模式
Vue.config.debug = true;

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
