<template>
  <div class="goods goods-waterfall" :style="{marginTop: '10px',height:goodsViewHeight+'px'}">
    <div class="goods-item goods-waterfall-item" ref="goodsItem"
         v-for="(item,index) in dataSource" :key="index" :style="goodsItemStyles[index]">
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

  created () {
    this.initData()
  },
  data: function () {
    return {
      dataSource: [],
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
      goodsViewHeight: ''
    }
  },
  methods: {
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          console.log(data.list)
          this.dataSource = data.list
          this.initImgStyles()

          this.$nextTick(function () {
            this.initWaterfall()
          })
        })
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
