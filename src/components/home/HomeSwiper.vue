<template>
<!--  swiper 1. swiperSlide 滑动模块 2. slot 配置分页器-->
  <swiper class="home-swiper" :options="swiperOptions">
    <swiper-slide   v-for="(item,index) in swiperImgList" :key="index">
      <img class="swiper-slide-img" :style="{height:height}" :src="item.icon" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { directive, Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'HomeSwiper',
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgList: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 1, // 一次显示几张图片
        // 设置分页器
        pagination: {
          el: '.swiper-pagination',
          // 设置点击可切换
          clickable: true,
          // 分页器样式
          type: 'bullets',
          bulletClass: 'custom-bullet-class',
          bulletActiveClass: 'custom-bullet-active-class'
        },
        // 设置前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 设置自动轮播
        autoplay: {
          delay: 1000 // 5秒切换一次
        },
        // 设置轮播可循环
        loop: true,
        // swiper 高度跟随slider高度变化
        autoHeight: true
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    onSwiper (swiper) {
      console.log(swiper)
    },
    onSlideChange () {
      console.log('slide change')
    }
  }
}
</script>

<style lang="scss">
.home-swiper{
  width: 100%;
  height: 200px;
  .swiper-slide-img{
    width: 100%;
  }

  .swiper-pagination{
    bottom: pxToRem(32);
    .custom-bullet-class{
      box-sizing: border-box;
      border-radius: 100%;
      height: pxToRem(6);
      width: pxToRem(6);
      border: pxToRem(1) solid #fff;
      margin: 0 pxToRem(4);
      display: inline-block;
      opacity: 1;
    }

    .custom-bullet-active-class{
      background-color: white;
    }
  }
}
</style>
