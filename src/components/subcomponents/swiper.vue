<template>
  <div>
    <mt-swipe :auto="4000">

      <!-- 组件中使用for  一定要制定key -->
      <!-- 将来谁使用这个轮播图组件，谁为我们传递lunbotuList数据 -->
      <!-- 此时lunbotuList应该是 父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <!--src 若当做表达式来计算，必须进行绑定 -->
        <img :src="item.imgurl" :class="{full:isfull}">
        <!-- //以上的imgurl参数名需要统一，应用的页面 有不一样的 需要赋值修改 列如item.src=item.imgurl-->
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析：为什么商品评论中的轮播图辣么丑 -->
  <!-- 1.首页中的图片，它的宽和高都是用了100% 宽度 -->
  <!-- 2.在商品详情页面中，轮播图的图片也使用宽高100%，会不好看 -->
  <!-- 3.商品详情页中的轮播图，期望高度100%，但是宽度为自适应 -->
  <!-- 4.分析后，问题的原因：首页中的轮播图和详情中的轮播图分歧点宽度到底是100%还是自适应 -->
  <!-- 5.既然这两个轮播图，其他方面没有冲突，只是宽高有分歧，那么我们可以定义一个属性，让使用轮播图的调用者，手动指定 是否为100%的宽度 -->
</template>

<script>
export default {
  props: ["lunbotuList","isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 320px;
}

.mint-swipe-item {
  text-align: center;
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

.full{
  width: 100%;
}
</style>
