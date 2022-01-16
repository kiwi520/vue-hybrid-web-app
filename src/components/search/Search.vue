<template>
  <div class="search-container" :style="{backgroundColor:bgColor}">
    <img class="search-container-icon" :src="icon" alt="">
    <span class="search-container-hint" :style="{color:hintColor}">头部测试</span>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    icon: {
      type: String,
      default: require('@img/search.svg')
    },
    hintColor: {
      type: String,
      default: '#999'
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.search-container{
  background-color: white;
  width: 100%;
  height: pxToRem(30);
  margin: pxToRem(2);
  border-radius: pxToRem(22);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &-icon{
    margin-left: $marginSize;
    width: pxToRem(16);
  }

  &-hint{
    margin-left: $marginSize;
    font-size: $minInfoSize;
    color: $hintColor;
  }
}
</style>
