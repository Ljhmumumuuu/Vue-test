<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key=item.id>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img src="../../images/phone/1.jpg">
            <div class="info">
              <h1>Apple iPhoneX 64G 银色 移动联通电信4G</h1>
              <p>
                <span class="price">￥{{item.price}}</span>
                <!-- 父组件向子组件传值 :initcount-->
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 问题：如何从购物车中获取商品的数量呢（服务器获取的不可用） -->
                <!-- 1.我们可以先创建一个空对象，然后循环购物车中的所有商品的数据，
                                把当前循环这条商品的id，作为对象的属性名，couter值作为对象的属性值，这样，
                                当吧所有的商品循环一遍，就会得到一个对象：{88:2,89:5；89:4} -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                <!-- item.id用来删除state,i用来删除goodslist -->
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [] //购物车中所有商品
    };
  },

  //本地获取
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var Arr = [];
      this.$store.state.car.forEach(item => {
        Arr.push(item);
      });

      if (Arr.length <= 0) {
        return;
      }

      this.goodslist = Arr;
      console.log("Arr", Arr);
    },
    remove(id, index) {
      //点击删除，把商品从store中根据传递的Id删除，同时把当前组件中的goodslist中，对应要删除的那个商品，使用index来删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id,val){
      //每当点击开关，把最新的开关状态，同步到store中
      console.log(id+'---'+val)
      this.$store.commit('updateGoodsSelected',{id,selected:val})
    }
  },
  props: ["initcount"],

  //异步获取购物车列表
  /*   created() {
    this.getGoodsList();
  },
  methods: {
    //通过id，获取详细的信息
    getGoodsList() {
      //1.获取到store中所有的商品的Id，然后拼接出一个 用逗号分隔的字符串
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错（接口问题）
      if (idArr.length <= 0) {
        return;
      }
      //获取购物车商品列表
      this.$http.get(
        "api/goods/getshopcarlist/" +
          idArr.join(",").then(result => {
            if (result.body.state === 0) {
              this.goodslist = result.body.message;
            }
          })
      );
    }
  }, */

  components: {
    numbox
  }
};
</script>

<style  lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .red {
    color: red;
    font-weight: bolder;
    font-size: 16px;
  }
}
</style>
