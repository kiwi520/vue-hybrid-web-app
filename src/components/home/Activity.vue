<template>
  <div class="activity">
<!--    插槽，展示活动内容-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Activity'
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.activity{
  //height: pxToRem(100);
  //height: auto;
  //overflow: hidden;
  //position: relative;
  z-index: 2;
}
</style>
