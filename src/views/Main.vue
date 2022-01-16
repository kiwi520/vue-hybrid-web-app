<template>
  <div class="main">
<!--    动态组件-->
    <component :is="currentComponent"></component>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
import toolBar from '@c/toolBar/ToolBar'

export default {
  name: 'Main',
  components: {
    'tool-bar': toolBar,
    // 引入异步组件
    home: () => import('@c/home/Home'),
    shopping: () => import('@c/shopping/Shopping'),
    my: () => import('@c/my/My')
  },
  data: function () {
    return {
      currentComponent: 'home'
    }
  },
  methods: {
    // 组件切换
    onChangeFragment (component) {
      console.log(component)
      this.currentComponent = component
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/style";
.main{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
</style>
