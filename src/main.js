//入口文件
import Vue from 'Vue'
// vue在node包中，可省略前缀
import app from './App.vue'
// App.vue 注意其路径

// 按需导入mint-ui
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

// 导入mui的样式
import './lib/mui/css/mui.css'

var vm=new Vue({
    el:'#app',
    render:c=>c(app)
})