<template>
  <div class="tool-bar">
    <div class="tool-bar-item" v-for="(item,index) in toolBarData" :key="index" @click="onChangeFragment(item.componentName,index)">
      <img class="tool-bar-item-img" :src="[index === selectedToolBarIndex? item.hIcon: item.nIcon]" alt="">
      <span class="tool-bar-item-title" :class="{'tool-bar-item-title-active': index === selectedToolBarIndex}">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data: function () {
    return {
      toolBarData: [
        {
          // 默认图标
          nIcon: require('@img/home-n.svg'),
          // 选中图标
          hIcon: require('@img/home-h.svg'),
          // title
          title: '首页',
          // 组件名称
          componentName: 'home'
        },
        {
          // 默认图标
          nIcon: require('@img/shopping-n.svg'),
          // 选中图标
          hIcon: require('@img/shopping-h.svg'),
          // title
          title: '购物车',
          // 组件名称
          componentName: 'shopping'
        },
        {
          // 默认图标
          nIcon: require('@img/my-n.svg'),
          // 选中图标
          hIcon: require('@img/my-h.svg'),
          // title
          title: '我的',
          // 组件名称
          componentName: 'my'
        }
      ],
      // 选中的toolbar按钮索引
      selectedToolBarIndex: 0
    }
  },
  methods: {
    onChangeFragment (component, index) {
      this.selectedToolBarIndex = index
      // 向父组件传递事件
      this.$emit('onChangeFragment', component)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
  .tool-bar{
    width: 100%;
    height: pxToRem(46);
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 pxToRem(16) 0 rgba(0,0,0,0.2);
    border-top: 1px solid $lineColor;
    &-item{
      text-align: center;
      padding: pxToRem(4);
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      &-img{
        width: pxToRem(22);
        height: pxToRem(22);
      }
      &-title{
        font-size: $infoSize;
        margin-top: pxToRem(4);
        &-active{
          color: $mainColor;
        }
      }
    }
  }
</style>
