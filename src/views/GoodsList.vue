<template>
  <div class="goods-list-page">
    <navigation-bar @onLeftClick="onBackClick" :page-name="'商品列表'">
      <template v-slot:nav-right>
        <img style="width: 20px; height: 20px" :src="layoutType.icon" @click="onChangeLayoutTypeClick()">
      </template>
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options @sortType="sortType"></goods-options>
      <goods :layout-type="layoutType.type" :sort="sortTypeParam"></goods>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/navigationBar/NavigationBar'
import GoodsOptions from '@c/home/GoodsOptions'
import Goods from '@c/home/Goods'

export default {
  name: 'GoodsList',
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  data: function () {
    return {
      // goods 展示形式数据源
      layoutTypeDatas: [
        {
          type: '1', // 垂直列表
          icon: require('@img/list-type.svg')
        },
        {
          type: '2', // 网格布局
          icon: require('@img/grid-type.svg')
        },
        {
          type: '3', // 瀑布流布局
          icon: require('@img/waterfall-type.svg')
        }
      ],
      layoutType: {
      },
      sortTypeParam: ''
    }
  },
  created () {
    this.layoutType = this.layoutTypeDatas[0]
  },
  methods: {
    // 返回按钮事件
    onBackClick () {
      this.$router.go(-1)
    },
    // 切换 goods 展示形式
    onChangeLayoutTypeClick () {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
        console.log(this.layoutType)
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
        console.log(this.layoutType)
      } else {
        this.layoutType = this.layoutTypeDatas[0]
        console.log(this.layoutType)
      }
    },
    sortType (id) {
      console.log('dddd')
      console.log(id)
      console.log('dddd')
      this.sortTypeParam = id
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/style";
.goods-list-page{
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  display: flex;
  flex-flow: column nowrap;
  &-content{
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }
}
</style>
