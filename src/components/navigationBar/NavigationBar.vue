<template>
  <div class="navigation-bar z-index-max" :style="navBarStyle" :class="{'bottom-line':pageName}">
    <div class="navigation-bar-left">
<!--       默认状态-->
      <img v-if="isShowBack" src="@img/back.svg" @click="$emit('onLeftClick')" alt="">
<!--      具名插槽-->
      <slot name="nav-left"></slot>
    </div>
    <div class="navigation-bar-middle">
<!--      默认状态-->
      <span v-if="pageName" class="page-title">{{pageName}}</span>
      <slot name="nav-middle"></slot>
    </div>
    <div class="navigation-bar-right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    // 页面标题
    pageName: {
      type: String,
      default: ''
    },
    // 是否展示后退按钮
    isShowBack: {
      type: Boolean,
      default: true
    },
    navBarStyle: {
      type: Object,
      default: function () {
        return {
          backgroundColor: 'white'
        }
      }
    }
  },
  methods: {
    goBack () {
      console.log('点点滴滴')
      window.history.back()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.navigation-bar{
  width: 100%;
  height: pxToRem(44);
  line-height: pxToRem(44);
  display: flex;
  justify-content: space-between;
  &-left,&-right{
    display: flex;
    height: 100%;
    width: pxToRem(26);
    padding: 0 $marginSize;
    img{
      width: 100%;
      align-self: center;
    }
  }

  &-middle{
    width: 100%;
    height: pxToRem(44);
    display: flex;
    justify-content: center;
    align-items: center;
    .page-title{
      font-size: $titleSize;
      align-self: center;
    }
  }
}
.bottom-line{
  border-bottom: 1px solid $lineColor;
}
</style>
