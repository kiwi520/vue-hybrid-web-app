<template>
  <span class="goods-no-have-tag">缺货</span>
</template>

<script>
export default {
  name: 'NoHave'
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.goods-no-have-tag{
  padding: 0 pxToRem(4);
  font-size: $minInfoSize;
  color: white;
  background-color: #999;
  border-radius: pxToRem(2);
  margin-right: pxToRem(2);
}
</style>
