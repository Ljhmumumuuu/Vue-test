<template>
  <div class="goodsinfo-container">

    <!-- 半场动画，只能使用钩子函数 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <!-- getcount 子传父的容器 -->
          <!-- 实际情况中异步传递数据 then时max值为underfind -->
          <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析：如何实现加入购物车的时候，拿到选择的数量 -->
            <!-- 1.进过分析发现：按钮属于goodsinfo页面，数字属于numberbox组件 -->
            <!-- 2.由于涉及到了父子组件的嵌套了，所有，无法直接再goodsinfo中获取到 选中的商品数量值 -->
            <!-- 3.这么解决这个问题：涉及到了子组件向父组件传值了（事件调用机制） -->
            <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把 数据当做参数，传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品的参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size=large plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size=large plain @click="goComment(id)">商品评价</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
//导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //将参数对象中的id挂载到data中，方便后期调用。
      lunbotu: [
        { id: 1, imgurl: "./src/images/phone/1.jpg" },
        { id: 2, imgurl: "./src/images/phone/2.jpg" },
        { id: 3, imgurl: "./src/images/phone/3.jpg" },
        { id: 4, imgurl: "./src/images/phone/4.jpg" }
      ],
      goodsinfo: {
        id: 1,
        title:
          "锤子（smartisan） 坚果 3 4G+64GB 碳黑色 全面屏双摄  全网通4G手机 双卡双待",
        add_time: "2015-04-19T19:34:55.000Z",
        goods_no: "SD93892",
        stock_quantity: 20,
        market_price: 269,
        sell_price: 199
      },
      ballFlag: false, //控制小球的隐藏和显示
      selectedCount: 1 //保存用户选中的商品数量，默认，认为用户买一个
    };
  },
  creater() {
    /*  this.getLunbotu();
    this.getGoodsInfo(); */
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          //先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件汇总至认识item.img,不认识item.src
          item.img = item.src;
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      //获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      // {id：商品id，count：要购买的数量，price:商品的单价，selcted：false}
      //拼接处一个，要保存到store中car数组里的 商品信息
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true //默认选中
      };
      //调用$store中的mutations,来将商品加入购物车
      this.$store.commit("addToCar", goodsinfo);
    },
    goDesc(id) {
      //点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      //点击跳转到评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      // 小球动画优化分析：
      // 1.先分析导致动画不准确的 本质原因：我们把小球最终位移到的位置,已经局限在了某一分辨率的滚动条未滚动的情况下：
      // 2.只要分辨率和测试的时候不一样，或者 滚动条有一定的滚动距离之后，问题就出现了。
      // 3.因此，我们经过分析，得到结论：不能把 位置的横纵坐标 直接写死，而是根据不同情况，动态计算这个坐标值。
      // 4.经过分析：先得到徽标的横纵坐标，在得到小球的横纵坐标，然后让x/y值求差，得到的结果，就是横纵坐标位移的距离。
      // 5.如何获取徽标和小球的位置？？ DomObject.getboundingclientRect()

      // 获取小球在的位置$refs 减少dom的操作
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取徽标在页面中的值
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      //xDist、yDist为相隔的距离
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.offsetWidth; //不写没动画，相当于更新
      el.style.transform = `translate(${xDist}px,${yDist}px)`; //es6 模板字符串
      // ease/贝塞尔都是动画效果
      // el.style.transition="all 1s ease";
      el.style.transition = "all 0.8s cubic-bezier(.17,.67,.55,.86)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      //当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectedCount = count;
      console.log("父组件拿到的数量值为：" + this.selectedCount);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eeeeee;
  overflow: hidden; //修复塌陷

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;

    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 527px;
    left: 149px;
  }
}
</style>

