<template>
<div class="seconds">
  <div class="seconds-wrap">
    <div class="seconds-wrap-title">京东秒杀</div>
<!--    倒计时模块-->
    <count-down :endHours="17"></count-down>
  </div>
  <div class="seconds-content">
      <div class="seconds-content-item" v-for="(item,index) in dataSource" :key="index">
        <img :src="item.icon" alt="" class="seconds-content-item-img">
        <p class="seconds-content-item-old-price">¥{{item.price | priceValue}}</p>
        <p class="seconds-content-item-price">¥{{item.oldPrice  | priceValue}}</p>
      </div>
  </div>
</div>
</template>

<script>
import CountDown from '@c/home/CountDown'

export default {
  name: 'Seconds',
  components: {
    CountDown
  },

  props: {
    dataSource: {
      type: [],
      required: true,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.seconds{
  width: 100%;
  background-color: white;
  border-radius: $radiusSize;
  margin: $marginSize;

  &-wrap{
    display: flex;
    padding: $marginSize;
    justify-content: flex-start;
    align-items: center;
    &-title{
      font-size: $titleSize;
      display: inline-block;
    }
  }
  &-content{
    padding: $marginSize 0;
    display: flex;
    overflow: hidden;
    overflow-x: scroll;

    &-item{
      padding: 0 pxToRem(12);
      text-align: center;
      &-img{
        width: pxToRem(66);
        height: pxToRem(66);
      }

      &-old-price{
        color: $mainColor;
        font-size: $titleSize;
      }
      &-price{
        color: $hintColor;
        font-size: $infoSize;
        margin-top: pxToRem(6);
        text-decoration: line-through;
      }
    }
  }

}
</style>
