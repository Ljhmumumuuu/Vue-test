<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>

        <hr>

        <div class="content" v-html="info.content">

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        //图文数据
        title:
          "锤子（smartisan） 坚果 3 4G+64GB 碳黑色 全面屏双摄  全网通4G手机 双卡双待",
        content:
          "在 2.2.0+，可选的在 router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。"
      }
    };
  },
  /* created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http
        .get("/api/goods/getdesc/" + this.$router.parmas.id)
        .then(result => {
          if (result.body.status === 0) {
            //先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件汇总至认识item.img,不认识item.src
            this.info = result.body.message[0];
          }
        });
    }
  } */
};
</script>

<style lang="scss" scoped>
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color:#226aff;
        text-align:center;
        margin: 15px 0;
    }
    content{
        img{
            width:100%;
        }
    }
}
</style>

