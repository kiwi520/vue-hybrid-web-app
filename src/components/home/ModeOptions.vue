<template>
  <div class="mode-options">
    <div class="mode-options-item" v-for="(item,index) in dataSource" :key="index">
      <img class="mode-options-item-img" :src="item.icon" alt="">
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModeOptions',
  data: function () {
    return {
      dataSource: [
        {
          id: '1',
          icon: require('@img/jingDongChaoShi.png'),
          title: '京东超市'
        },
        {
          id: '2',
          icon: require('@img/haiTunQuanQiu.png'),
          title: '海屯全球'
        },
        {
          id: '3',
          icon: require('@img/jingDongFuShi.png'),
          title: '京东服饰'
        },
        {
          id: '4',
          icon: require('@img/jingDongShengXian.png'),
          title: '京东生鲜'
        },
        {
          id: '5',
          icon: require('@img/jingDongDaoJia.png'),
          title: '京东到家'
        },
        {
          id: '6',
          icon: require('@img/chongZhiJiaoFei.png'),
          title: '充值缴费'
        },
        {
          id: '7',
          icon: require('@img/jingDongPinGou.png'),
          title: '9.9元拼'
        },
        {
          id: '8',
          icon: require('@img/lingJuan.png'),
          title: '领劵'
        },
        {
          id: '9',
          icon: require('@img/zhuanQian.png'),
          title: '赚钱'
        },
        {
          id: '10',
          icon: require('@img/quanBu.png'),
          title: '全部'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.mode-options{
  width: 100%;
  background-color: white;
  display: flex;
  flex-flow: row wrap;
  &-item{
    width: 20%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    &-img{
      width: pxToRem(40);
      height: pxToRem(40);
    }

    p{
      font-size: $minInfoSize;
      padding: 10px;
    }
  }
}
</style>
