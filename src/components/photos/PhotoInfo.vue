<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time|dateFormat}}</span>
            <span>点击:{{photoinfo.click}}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论子组件(现成) -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>


<script>
// 1.导入评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      //获取到路由中的id号
      id: this.$route.params.id,
      //图片详情
      photoinfo: {
        title: "现代简约现代简约现代简约现代简约",
        add_time: "2015-04-19T20:09:30.000Z",
        click: 2,
        content:
          "不要简朴 不要素雅嘿嘿嘿嘿嘿嘿嘿嘿嘿不要素雅嘿嘿嘿嘿嘿嘿嘿嘿嘿不要素雅嘿嘿嘿嘿嘿嘿嘿嘿嘿"
      },
      slide1: [
        {
          src:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
          msrc:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
          alt: "picture1",
          title: "Image Caption 1",
          w: 600,
          h: 400
        },
        {
          src:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
          msrc:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
          alt: "picture2",
          title: "Image Caption 2",
          w: 1200,
          h: 900
        }
      ]
    };
  },
  //   注册子组件
  components: {
    "cmt-box": comment
  },
  methods: {
    handleClose() {
      console.log("close event");
    }
  }
  /* created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      //获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThumbs(){
        //获取缩略图
        this.$http.get('api/getthumimages/'+this.id).then(result=>{
            if(result.body.status===0){
                //循环每个图片的数据，补全图片的宽和高
                result.body.message.forEach(item => {
                    item.w=600;
                    item.h=400;
                });
                //把完整的数据保存到list中
                this.list=result.body.message;
            }
    
        })
    }
  } */
};
</script>

<style lang="scss">
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    .my-gallery {
      display: flex;
      justify-content: center;

      img {
        width: 150px;
        margin: 10px;
        box-shadow: 0 0 8px #999;
      }
    }
    figure {
      margin: 0;
    }
  }
}
</style>
