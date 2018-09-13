//入口文件
import Vue from 'Vue'
// vue在node包中 可省略前缀


//1.1导入路由包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)


//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)



// 按需导入mint-ui
import { Header,Swipe, SwipeItem  } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


//1.3导入组件的router.js路由模块
import router from './router.js'

import app from './App.vue'
// App.vue 注意其路径



var vm = new Vue({
    el: '#app',
    render: c => c(app),
    //1.4挂载路由对象到VM实例上
    router
})