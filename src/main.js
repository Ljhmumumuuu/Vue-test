//入口文件
import Vue from 'Vue'
// vue在node包中 可省略前缀


//1.1导入路由包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)


//注册vuex
import Vuex from 'Vuex'
Vue.use(Vuex)

// JSON.parse   将json字符串转换为对象
// JSON.stringify  将js值转换为json字符串

// 每次当进入网站，肯定会调用main.js 在刚调用的时候，先从本地存储中，把购物车的数据读出来放在store中
var car = JSON.parse(localStorage.getItem('car') || '[]')


var store = new Vuex.Store({
    state: {//this.$store.state.xxx
        car: car//将购物车中的商品的数据，用一个数组存储起来，在car数组中存储一些商品的对象，咱们可以暂时将这个商品对象，设计成这个样子
        // {id：商品id，count：要购买的数量，price:商品的单价，selcted：false}
    },
    mutations: {//this.$store.commit('方法名称'，'按需传递唯一参数')
        addToCar(state, goodsinfo) {
            //点击加入购物车，把商品信息，保存到store中的car上。
            //分析：
            //1.如果购物车中，之前就已经有这个对应的商品了，name只需要更新数量
            //2.如果没有，则直接把商品数据，push到car中即可

            //假设在购物车中，没有找到对应的商品
            var flag = false

            state.car.some(item => {//当前页面goodsinfo.id只有一个，只要some成功一个就行
                if (item.id == goodsinfo.id) {//有相同商品
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true//终止后续some循环
                }
            })

            //如果最终循环完毕，得到到flag还是false，则把商品数据直接push到购物车中(即未进入到some中)

            if (!flag) {
                state.car.push(goodsinfo)
            }

            //当更新car之后，把car数组，存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            //修改购物车中商品的数量值
            //分析：
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //修改完商品的数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))

        },
        removeFormCar(state, id) {
            //根据id，从store中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            // 将删除完毕后的，最新的购物车数据，同步到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected

                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters: {//this.$store.getters.xxx
        //相当于计算属性，相当于filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })

            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o={
                count:0,//勾选的数量
                amount:0,//勾选的总价
            }
            state.car.forEach(item=>{
               if(item.selected){
                o.count+=item.count
                o.amount+=item.price*item.count
               }
            })
            return o
        }

    }
})


import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function (datastr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(datastr).format(pattern)
})



//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)

//vue-resource插件
Vue.http.options.root = 'http://vue.studyit.io ';
//全局设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;


// 按需导入mint-ui
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload); */

import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'

import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)



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
    router,
    store //挂载store 状态管理对象
})