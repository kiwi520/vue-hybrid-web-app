<template>
  <div class="shopping">
    <navigation-bar :page-name="'购物车'" :is-show-back="true"></navigation-bar>
    <h1>shopping</h1>
  </div>
</template>

<script>
import NavigationBar from '@c/navigationBar/NavigationBar'

export default {
  name: 'Shopping',
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
.shopping{
  width: 100%;
  height: 100%;
  font-size: pxToRem(32);
}
</style>
