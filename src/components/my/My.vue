<template>
  <div class="my">
    <navigation-bar :page-name="'个人中心'" :is-show-back="false"></navigation-bar>
    <h1>My</h1>
  </div>
</template>

<script>
import NavigationBar from '@c/navigationBar/NavigationBar'

export default {
  name: 'My',
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
.my{
  width: 100%;
  height: 100%;
  font-size: pxToRem(32);
}
</style>
