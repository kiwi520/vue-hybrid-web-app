<template>
  <div class="goods" :class="layoutClass" :style="{marginTop: '10px',height:goodsViewHeight+'px'}">
    <div class="goods-item" :class="layoutItemClass" ref="goodsItem"
         v-for="(item,index) in sortGoodsData" :key="index" :style="goodsItemStyles[index]">
      <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" alt="">
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint':item.isHave}">
          <direct v-if="item.isDirect"></direct>
          <no-have v-if="item.isHave"></no-have>
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">¥{{item.price | priceValue}}</p>
          <p class="goods-item-desc-data-volume">销量{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoHave from '@c/noHave/NoHave'
import Direct from '@c/direct/Direct'
export default {
  name: 'Goods',
  components: { Direct, NoHave },
  props: {
    /**
     * 在父组件中得展示类型
     * 1.垂直列表
     * 2.网格布局
     * 3.瀑布流布局
     */
    layoutType: {
      type: String,
      default: '1'
    },
    /**
     * 排序规则
     * 1: 默认
     * 1-2: 价格由高到低
     * 1-3: 销量有高到低
     * 2: 有货优先
     * 3: 直营优先
     */
    sort: {
      type: String,
      default: '1'
    }
  },
  created () {
    this.initData()
  },
  watch: {
    // 监听 layoutType
    layoutType: function () {
      this.initLayout()
    },
    sort: function (n, o) {
      console.log(n)
      console.log(o)
      if (n !== o) {
        console.log('nnn')
        this.setSortGoodsData()
      }
    }
  },
  data: function () {
    return {
      dataSource: [],
      // 排序数据
      sortGoodsData: [],
      // 图片最大高度
      MAX_IMG_HEIGHT: 230,
      // 图片最小高度
      MIN_IMG_HEIGHT: 178,
      // 图片样式数据
      imgStyles: [],
      // item margin
      ITEM_MARGIN_SIZE: 8,
      goodsItemStyles: [],
      // goods列表组件高度
      goodsViewHeight: '100%',
      // 不同展示形式下的class名称
      layoutClass: 'goods-list', // goods-list(默认垂直列表)、goods-waterfall、goods-gird
      layoutItemClass: 'goods-list-item' // goods-list-item(默认为垂直列表)、goods-waterfall-item、goods-gird-item
    }
  },
  methods: {
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          console.log(data.list)
          this.dataSource = data.list
          this.sortGoodsData = data.list
          // 设置布局
          this.initLayout()
        })
    },

    /**
     * 根据layoutType 变化来改变样式
     * 1. 初始化影响到布局的数据
     *    1.1、 goodsViewHeight -> 垂直布局、 网格布局（100%） 瀑布流（实际高度）
     *    1.2、 goodsItemStyles
     *    1.3、 ItemStyles
     * 2. 根据layoutType改变样式
     *
     */
    initLayout: function () {
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []

      switch (this.layoutType) {
        // 垂直列表
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        // 网格布局
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        // 瀑布流布局
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          this.initImgStyles()

          this.$nextTick(function () {
            this.initWaterfall()
          })
          break
      }
    },
    /**
     * 排序goods
     * 1: 默认
     * 1-2: 价格由高到低
     * 1-3: 销量有高到低
     * 2: 有货优先
     * 3: 直营优先
     */
    setSortGoodsData: function () {
      switch (this.sort) {
        case '1':
          this.sortGoodsData = this.dataSource
          break
        case '1-2':
          this.sortGoodsData = this.dataSource.sort((a, b) => {
            return b.price - a.price
          })
          break
        case '1-3':
          this.sortGoodsData = this.dataSource.sort((a, b) => {
            return b.volume - a.volume
          })
          break
        case '2':
          this.sortGoodsData = this.dataSource.filter((a) => a.isHave)
          break
        case '3':
          this.sortGoodsData = this.dataSource.filter((a) => a.isDirect)
          break
      }
    },
    /**
     * 返回随机的图片高度
     */
    imgHeight: function () {
      const height = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
      return height
    },
    // 根据随机的图片高度，生成对应的图片样式数据
    initImgStyles: function () {
      this.dataSource.forEach(item => {
        this.imgStyles.push({
          height: this.imgHeight() + 'px'
        })
      })
    },
    /**
     * 1.获取所有的item数据
     * 2.遍历item元素，得到每一个item的高度，加上一个margin的高度
     * 3.创建两个变量: leftHeightTotal, rightHeightTotal,左右两侧距离顶部的高度
     * 4.通过每个item的margin高度来确定对应item的布局位置
     */
    initWaterfall () {
      const $goodsItem = this.$refs.goodsItem
      if (!$goodsItem) return

      let leftHeightTotal = 0
      let rightHeightTotal = 0

      $goodsItem.forEach(($el, index) => {
        let goodsItemStyle = {}
        const elHieght = $el.clientHeight + this.ITEM_MARGIN_SIZE
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          leftHeightTotal += elHieght
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }

          rightHeightTotal += elHieght
        }

        this.goodsItemStyles.push(goodsItemStyle)
      })
      // 对比左右两侧最大的高度，最大的高度为goods组件的高度
      this.goodsViewHeight = leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.goods{
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-item{
    background-color: white;
    padding: $marginSize;
    box-sizing: border-box;

    &-desc{
      width: 100%;
      margin-top: pxToRem(4);
      &-name {
        font-size: $infoSize;
        line-height: pxToRem(18);
        display: flex;
        flex-flow: row wrap;

        &-hint{
          color: $hintColor;
        }
      }

      &-data{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;
        &-price{
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
        &-volume{
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}

// 垂直列表
.goods-list{
    &-item{
      display: flex;
      border-bottom: 1px solid $lineColor;

      .goods-item-img{
        width: pxToRem(120);
        height: pxToRem(120);
      }

      .goods-item-desc{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: $marginSize;
      }
    }
}

// 网格形式
.goods-gird{
  padding: $marginSize;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  &-item{
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;

    .goods-item-img{
      width: 100%;
    }
  }
}

//瀑布流
.goods-waterfall{
  position: relative;
  margin: $marginSize;
  &-item{
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;
    .goods-item-img{
      width: 100%;
    }
  }
}
</style>
