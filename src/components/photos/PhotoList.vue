<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!-- class改为属性 -->
                    <!--   <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a> -->
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.imgurl">
                <div class="info">
                    <h1 class="info-title">
                        {{item.title}}
                    </h1>
                    <div class="info-body">
                        {{item.content}}
                    </div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
//1.导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      //所有分类的列表数组
      cates: [
        {
          title: "全部",
          id: 0
        },
        {
          title: "家具生活",
          id: 1
        },
        {
          title: "摄影设计",
          id: 2
        },
        {
          title: "明星美女",
          id: 3
        },
        {
          title: "摄影学习",
          id: 4
        },
        {
          title: "摄影器材",
          id: 5
        },
        {
          title: "厨房家具",
          id: 6
        }
      ],
      //获取图片列表的样式
      list: [
        {
          id: 1,
          imgurl: "./src/images/list-img/1.jpg",
          title: "title1",
          content: "content1"
        },
        {
          id: 2,
          imgurl: "./src/images/list-img/2.jpg",
          title: "title2",
          content: "content2"
        },
        {
          id: 3,
          imgurl: "./src/images/list-img/3.jpg",
          title: "title2",
          content: "content2"
        }
      ]
    };
  },
  //当组件中的DOM结构被渲染好，并放到页面中后，会执行这个钩子函数
  //如果要操作元素，最好在mouted中，因为这个时候的DOM元素，为最新的
  mounted() {
    //2.mui初始化
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getPhotoListByCateId() {
      this.list = [
        {
          id: 1,
          imgurl: "./src/images/list-img/1.jpg"
        }
      ];
    }
  }

  /* ,
  created() {
    this.getAllCategory();
    //默认请求所有图片的数据
    this.getPhotoListByCateId(0);
  },
  methods: {
    getAllCategory() {
      //获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          //手动拼接处一个最完整的，分类列表
          this.body.message.unshift({
            title: "全部",
            id: 0
          });
          this.cates = result.body.message;
        }
      });
    },
    //实际，此方法调用2次：
    // 1.页面刚开始
    // 2.点击事件后
    getPhotoListByCateId(cateId) {
      //根据分类id，获取图片列表(默认全部)
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  } */
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  margin: 0;
  padding: 10px 10px 0 10px;
  li {
    margin-bottom: 10px;
    list-style: none;
    background-color: #ccc;
    text-align: center;
    box-shadow: 0 0 6px #999;
    position: relative;
    img {
      width: 100%;
      //图像3像素问题
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}

.info {
  color: #fff;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  width: 100%;
  max-height: 80px;
  .info-title {
    font-size: 14px;
  }
  .info-content {
    font-size: 13px;
  }
}
</style>
