<template>
  <div class="goods-list">
    <!--    <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.imgurl">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price"></p>
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

    <!-- 在网页中：有2中跳转方式 -->
    <!-- 1：使用a标签的形式叫做标签跳转 -->
    <!-- 2：使用window.location.href的形式，叫做编程式导航 -->

    <div class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" @click="goDetail(item.id)">
      <img :src="item.imgurl">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price"></p>
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <!-- <mt-button type="danger" size="larger" @click="getMore">加载更多</mt-button> -->
    <mt-button type="danger" size="large">加载更多</mt-button>
  </div>
</template>




<script>
export default {
  data() {
    //data是往自己组件内部，挂载一些私有数据的
    return {
      //分页的页数
      pageindex: 1,
      goodslist: [
        {
          id: 1,
          imgurl: "./src/images/phone/1.jpg",
          title:
            "【白条6期免息】麒麟970芯片/DxO评分70芯片/DxO评分70芯片/DxO评分过百/夜神之眼",
          sell_price: "899",
          market_price: "999",
          stock_quantity: "60"
        },
        {
          id: 2,
          imgurl: "./src/images/phone/2.jpg",
          title:
            "【白条6期免息】麒麟970芯片/DxO评分70芯片/DxO评分70芯片/DxO评分过百/夜神之眼",
          sell_price: "899",
          market_price: "999",
          stock_quantity: "60"
        },
        {
          id: 3,
          imgurl: "./src/images/phone/3.jpg",
          title:
            "【白条6期免息】麒麟970芯片/DxO评分70芯片/DxO评分70芯片/DxO评分过百/夜神之眼",
          sell_price: "899",
          market_price: "999",
          stock_quantity: "60"
        },
        {
          id: 4,
          imgurl: "./src/images/phone/4.jpg",
          title:
            "【白条6期免息】麒麟970芯片/DxO评分70芯片/DxO评分70芯片/DxO评分过百/夜神之眼",
          sell_price: "899",
          market_price: "999",
          stock_quantity: "60"
        },
        {
          id: 5,
          imgurl: "./src/images/phone/5.jpg",
          title:
            "【白条6期免息】麒麟970芯片/DxO评分70芯片/DxO评分70芯片/DxO评分过百/夜神之眼",
          sell_price: "899",
          market_price: "999",
          stock_quantity: "60"
        }
      ]
    };
  },
  created() {
    // this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取商品列表
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodlist = this.goodslist.content(result.body.message);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    //使用js的形式进行路由导航
    goDetail(id) {
      //注意：一定要区分this.$route和this.$router 这两个对象
      //其中:this.$router 是路由【参数对象】，所有路由中的参数，params,query都属于
      //其中:this.$router 是一个【路由导航对象】，用它 可以方便的使用js代码，实现路由的前进、后退、跳转到新的URL地址

      // https://router.vuejs.org/zh/guide/essentials/navigation.html
      console.log(this);
      // 1.最简单的
      this.$router.push("/home/goodsinfo/" + id);
      // 2.传递对象
      //   this.$router.push({ path: "/home/goodsinfo/" + id });
      // 3.命名的路由
      //   this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 285px;

    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      line-height: 16px;
    }

    .info {
      background: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
