<template>
  <span class="goods-direct-tag">直营</span>
</template>

<script>
export default {
  name: 'Direct'
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.goods-direct-tag{
  padding: 0 pxToRem(4);
  font-size: $minInfoSize;
  color: white;
  background-color: $mainColor;
  border-radius: pxToRem(2);
  margin-right: pxToRem(2);
}
</style>
