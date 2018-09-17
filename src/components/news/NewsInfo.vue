<template>
    <div class=newsinfo-container>
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.time|dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论区域 -->
        <component-box :id="this.id"></component-box>
    </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      //将URL地址中传来的id值，挂在到data上，方便以后调用。
      id: this.$route.params.id,
      newsinfo: {
        title: "Can't stop now",
        time: "2015-04-16T03:50:28.000Z",
        click: 10,
        content:
          "<div style='color:gray'>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。</div>"
      }
    };
  },
  created() {
    /*     this.getNewsInfo(); */
  },
  methods: {
    /*     getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻失败!");
        }
      });
    } */
  },
  components:{
      //用来注册子节点
      "component-box":comment
  }
};
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      //只有当去除scoped时，100%才会生效
      width: 100%;
    }
  }
}
</style>
