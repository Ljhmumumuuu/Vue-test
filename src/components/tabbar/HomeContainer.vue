<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <!-- 组件中使用for  一定要制定key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <!--src 若当做表达式来计算，必须进行绑定 -->
        <img :src="item.imgurl">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 9宫格到6宫格的改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/icons/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/icons/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/icons/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/icons/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/icons/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/icons/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>

    </ul>

  </div>
</template>

<script>
//按需导入
import { Toast } from "mint-ui";

//本地图片获取
export default {
  data() {
    return {
      lunbotuList: [
        { id: 1, imgurl: "./src/images/cat1.png" },
        { id: 2, imgurl: "./src/images/cat2.png" },
        { id: 3, imgurl: "./src/images/cat3.png" },
        { id: 4, imgurl: "./src/images/cat4.png" }
      ]
    };
  },
  created() {
    // console.log(this.lunbotuList);
  }
};

//加载resouce获得的图片
/* export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    //获取轮播图的方法，现改为axios
    getLunbotu() {
      this.$http.get("./src/images").then(result => {
        console.log(result);
        if (result.status === 200) {
          //成功
           Toast('加载轮播图成功')
          this.lunbotuList = result.body;
          console.log( this.lunbotuList);
        } else {
          //失败
          Toast('加载轮播图失败')
        }
      });
    }
  }
}; */
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 320px;
}

.mint-swipe-item {
  //scss的写法[交集选择器]
  &:nth-child(1) {
    background-color: antiquewhite;
  }
  &:nth-child(2) {
    background-color: brown;
  }
  &:nth-child(3) {
    background-color: chocolate;
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.mui-grid-view.mui-grid-9 {
  background: #fff;
  border: none;
  img{
    width: 60px;
    height: 60px
  }
  .mui-media-body{
    font-size: 13px
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>
