<template>
<div class="count-down">
  <span class="count-down-end-time">{{endHours}}点场</span>
  <span class="count-down-surplus">{{ surplus | formatTime }}</span>
</div>

</template>

<script>
/**
 *  1. 当前时间未到开始时间的时候，展示倒计时
 *  2. 当前时间到了开始时间的时候， 展示活动进行中
 *  3. 当前时间超过了结束时间的时候，活动已结束
 */
export default {
  name: 'CountDown',
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: function () {
    return {
      surplus: '',
      diffSeconds: 0,
      timer: null
    }
  },
  created () {
    this.computedSurplusTime()
  },
  watch: {
    diffSeconds: function (vla) {
      // 获取小时数
      const hours = Math.floor(vla / 3600)
      // 获取分钟数
      const minutes = Math.floor(vla / 60) % 60
      // 获取秒数
      const seconds = vla % 60

      this.surplus = `${hours}:${minutes}:${seconds}`

      if (vla === 0) {
        this.computedSurplusTime()
      }
    },
    endHours: function (newValue) {
      this.computedSurplusTime()
    }
  },
  methods: {
    computedSurplusTime () {
      const date = new Date()
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束'
      } else if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中'
      } else {
        this.surplus = '活动未开始'
        // 1.获取当前时间与活动开始时间的时间差
        // 1.将数据差转化成相应的时间格式 时分秒

        // 获取相差的小时
        const diffHours = this.endHours - date.getHours() - 1

        // 获取相差的分钟数
        const diffMinutes = 60 - date.getMinutes() - 1

        // 获取相差的秒数
        const diffSeconds = 60 - date.getSeconds()

        this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds

        this.timer = setInterval(() => {
          this.diffSeconds -= 1
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.count-down{
  display: inline-block;
  font-size: $infoSize;
  margin-left: $marginSize;
  span {
    display: inline-block;
    padding: pxToRem(2) pxToRem(4);
  }

  &-end-time {
    line-height: pxToRem(15);
    background-color: $mainColor;
    border-top-left-radius: pxToRem(4);
    border-bottom-left-radius: pxToRem(4);
    border: pxToRem(1) solid $mainColor;
    color: white;
  }
  &-surplus{
    line-height: pxToRem(15);
    background-color: white;
    border-top-right-radius: pxToRem(4);
    border-bottom-right-radius: pxToRem(4);
    border: pxToRem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>
