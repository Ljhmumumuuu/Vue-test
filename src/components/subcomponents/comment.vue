<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea cols="30" rows="10" placeholder="请输入要bb的内容（最多20字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.id">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{item.name}}&nbsp;&nbsp;发表时间：{{item.time|dateFormat}}
                </div>
                <div class="cmt-vody">
                    {{item.content==='undefined'?'此用户很懒，啥也没说':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1, //默认显示第一页
      comments: [
        {
          id: 1,
          name: "王1",
          time: "2015-04-16T03:50:28.000Z",
          content: "lalalala1~~"
        },
        {
          id: 2,
          name: "王2",
          time: "2015-04-16T03:50:28.000Z",
          content: "lalalala2~~"
        },
        {
          id: 3,
          name: "王3",
          time: "2015-04-16T03:50:28.000Z",
          content: "lalalala3~~"
        },
        {
          id: 4,
          name: "王4",
          time: "2015-04-16T03:50:28.000Z",
          content: "lalalala4~~"
        },
        {
          id: 5,
          name: "王4",
          time: "2015-04-16T03:50:28.000Z",
          content: "undefined"
        }
      ] //所有评论数
    };
  },
  created() {
    // this.getComments();
  },
  methods: {
    //加载更多
    getMore() {
      this.pageIndex++;
      this.comments.push({
        id: 6,
        name: "王6",
        time: "2015-04-16T03:50:28.000Z",
        content: "undefined"
      });
    }

    /*   getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + thispageIndex)
        .then(result => {
          if (result.body.status === 0) {
          } else {
            Toast("获取评论失败！");
          }
        });
    } */
  },
  props: ["id"]
};
</script>


<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>


