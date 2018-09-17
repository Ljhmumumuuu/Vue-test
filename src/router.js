import VueRouter from 'vue-router'

//导入对应的路由组件(注意路径./..)
import HomeContainer from './components/tabbar/HomeContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/search',component:SearchContainer},
    {path:'/shopcar',component:ShopcarContainer},
    {path:'/member',component:MemberContainer},
    {path:'/home/newslist',component:NewsList},
    {path:'/home/newsInfo/:id',component:NewsInfo}

  ],
  linkActiveClass:'mui-active'//默认覆盖路由高亮的类  link-active-class
});

// 把路由对象暴露出去
export default router