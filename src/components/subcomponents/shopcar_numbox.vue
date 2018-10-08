<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
        <!-- readonly(只读):无法直接修改值，只能上下+— 调整 -->
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>


<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
        //数量改变了
        // console.log(this.$refs.numbox.value);
        // 每当数量值改变，则立刻把最新的数量同步到购物车的 store 中，覆盖之前的数量值
        this.$store.commit("updateGoodsInfo",{
            id:this.goodsid,
            count:this.$refs.numbox.value
        })

    }
  },
  props: ["initcount","goodsid"]
};
</script>

<style lang="scss" scoped>
</style>
