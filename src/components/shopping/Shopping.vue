<template>
  <div class="shopping">
    <navigation-bar @onLeftClick="onLeftClick" :page-name="'购物车'" :is-show-back="true"></navigation-bar>
    <h1>shopping</h1>
  </div>
</template>

<script>
import NavigationBar from '@c/navigationBar/NavigationBar'

export default {
  name: 'Shopping',
  components: {
    NavigationBar
  },
  methods: {
    onLeftClick: function () {
      console.log('onLeftClick')
      console.log('onLeftClick')
      console.log('onLeftClick')
      this.$router.go(-1)
    }
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
