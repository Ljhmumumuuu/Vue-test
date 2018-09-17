<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newList" :key=item.id>
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" src="http://img.hb.aicdn.com/f1b2dc9a80ae6d63318324f812727897fff30794c9cd-5rnkof_sq320">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.time|dateFormat}}</span>
                            <span>点击：{{item.clcik}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      //新闻列表
      //   newList: [],
      newList: [
        {
          id: 10,
          title: "lalalala0",
          time: "2015-04-16T03:50:28.000Z",
          clcik: 1
        },
        {
          id: 11,
          title: "lalalala1",
          time: "2015-04-16T03:50:28.000Z",
          clcik: 1
        },
        {
          id: 12,
          title: "lalalala2",
          time: "2015-04-16T03:50:28.000Z",
          clcik: 1
        },
        {
          id: 13,
          title: "lalalala3",
          time: "2015-04-16T03:50:28.000Z",
          clcik: 1
        },
        {
          id: 14,
          title: "lalalala4",
          time: "2015-04-16T03:50:28.000Z",
          clcik: 1
        },
        {
          id: 15,
          title: "lalalala5",
          time: "2015-04-16T03:50:28.000Z",
          clcik: 1
        },
        {
          id: 16,
          title: "lalalala6",
          time: "2015-04-16T03:50:28.000Z",
          clcik: 1
        }
      ]
    };
  },
  created() {
    /*   getNewsList(); */
  },
  methods: {
    /*     getNewsList() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          //如果没有失败，把数据保存在data上
          this.newList = result.body.message;
        } else {
          Tosat("获取新闻列表失败");
        }
      });
    } */
  }
};
</script>


<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
