<template>
  <div class="home" @scroll.capture="onScrollChange($event)">
    <navigation-bar :is-show-back="false" :nav-bar-style="navBarStyle">
      <template v-slot:nav-left>
        <img :src="navBarCurrentStyle.leftIcon" alt="">
      </template>
<!--      中间插槽-->
      <template v-slot:nav-middle>
        <search :bg-color="navBarCurrentStyle.search.bgColor" :hint-color="navBarCurrentStyle.search.hintColor" :src="navBarCurrentStyle.search.icon"></search>
      </template>
<!--      右侧中间插槽-->
      <template v-slot:nav-right>
        <img :src="navBarCurrentStyle.rightIcon" alt="">
      </template>
    </navigation-bar>
    <div class="home-content">
      <home-swiper :swiperImgList="swiperImgList" :height="swiperHeight"></home-swiper>
      <activity>
        <div class="activity-list">
          <img v-for="(item,index) in activityData" :key="index" :src="item.icon" alt="">
        </div>
      </activity>
<!--      功能选项-->
      <mode-options style="margin-top: 10px"></mode-options>
<!--      秒杀模块-->
      <div style="margin-right:16px">
        <seconds :data-source="secondsData"></seconds>
      </div>
<!--      品购节-->
      <activity>
        <div class="shopping-festival">
          <img src="@img/haoHuoQiang.gif" alt="">
        </div>
      </activity>
<!--      商品列表-->
      <goods :layout-type="'3'"></goods>
    </div>
  </div>
</template>

<script>
import HomeSwiper from '@c/home/HomeSwiper'
import Activity from '@c/home/Activity'
import ModeOptions from '@c/home/ModeOptions'
import Seconds from '@c/home/Seconds'
import Goods from '@c/home/Goods'
import NavigationBar from '@c/navigationBar/NavigationBar'
import Search from '@c/search/Search'
export default {
  name: 'Home',
  components: { HomeSwiper, Activity, ModeOptions, Seconds, Goods, NavigationBar, Search },
  data: function () {
    return {
      swiperImgList: [
        {
          icon: require('@img/swiper/swiper-1.jpg'),
          id: 1
        }, {
          icon: require('@img/swiper/swiper-2.jpg'),
          id: 2
        }, {
          icon: require('@img/swiper/swiper-3.jpg'),
          id: 3
        }, {
          icon: require('@img/swiper/swiper-4.jpg'),
          id: 4
        }, {
          icon: require('@img/swiper/swiper-5.jpg'),
          id: 5
        }, {
          icon: require('@img/swiper/swiper-6.jpg'),
          id: 6
        }, {
          icon: require('@img/swiper/swiper-7.jpg'),
          id: 7
        }, {
          icon: require('@img/swiper/swiper-8.jpg'),
          id: 8
        }
      ],
      swiperHeight: '184px',
      activityData: [],
      secondsData: [],
      // navBar 插槽的样式数据，包含页面未开始滑动时候插槽的样式(默认样式)
      // 和 页面滑动到锚定点之后的插槽样式(高亮模式)
      navBarSlotStyle: {
        normal: {
          // 左侧插槽
          leftIcon: require('@img/more-white.svg'),
          // 中间插槽
          search: {
            bgColor: '#fff',
            hintColor: '#999',
            icon: require('@img/search.svg')
          },
          rightIcon: require('@img/message-white.svg')
        },
        highlight: {
          // 左侧插槽
          leftIcon: require('@img/more.svg'),
          // 中间插槽
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#fff',
            icon: require('@img/search-white.svg')
          },
          rightIcon: require('@img/message.svg')
        }
      },
      // navBar 当前使用的插槽样式
      navBarCurrentStyle: {},
      // navBar 定制样式
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 记录页面滚动值
      scrollTopValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160
    }
  },
  created () {
    this.navBarCurrentStyle = this.navBarSlotStyle.normal
    this.initData()
  },
  methods: {
    initData: function () {
      // this.$http.get('/swiper')
      //   .then(data => {
      //     console.log(data)
      //     this.swiperImgList = data.list
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // this.$http.get('/activitys')
      //   .then(data => {
      //     console.log(data)
      //     this.activityData = data.list
      //   }).catch(err => {
      //     console.log(err)
      //   })

      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        // this.$http.get('/secord'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperImgList, activityData, secondsData) => {
        this.swiperImgList = swiperImgList.list
        this.activityData = activityData.list
        this.secondsData = secondsData.list
        console.log(this.secondsData)
      })).catch(err => {
        console.log(err)
      })
    },
    /**
     * 监听页面滚动
     * 1. 获取到当前页面滚动的top
     * 2. 计算 navBar 背景颜色（navBar 背景透明度）
     */
    onScrollChange ($event) {
      // 获取到当前页面滚动到top值
      this.scrollTopValue = $event.target.scrollTop
      // 计算 navBar 背景颜色（navBar 背景透明度）
      const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP

      this.navBarStyle.backgroundColor = 'rgba(255,255,255,' + opacity + ')'
      if (opacity >= 1) {
        this.navBarCurrentStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentStyle = this.navBarSlotStyle.normal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/style";
.home{
  width: 100%;
  height: 100%;
  //font-size: pxToRem(32);
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-content{
    width: 100%;
    height: 100%;
    //height: pxToRem(130);
    .activity-list{
      //position: absolute;
      margin-top: pxToRem(-18);
      background-color: white;
      border-top-left-radius: pxToRem(8);
      border-top-right-radius: pxToRem(8);
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      z-index: 2;
      img{
        display: inline-block;
        width: 33.3333%;
      }
    }

    .shopping-festival{
      //background-color: white;
      margin-top: $marginSize;
      margin-bottom: $marginSize;
      background-color: $bgColor;
      img{
        width: 100%;
      }
    }
  }
}
</style>
