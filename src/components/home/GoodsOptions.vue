<template>
  <div class="goods-options z-index-2">
<!--    一级选项-->
    <ul class="goods-options-list">
      <li class="goods-options-list-item" v-for="(item,index) in optionsData" :key="index">
        <a href="javascript:;" class="goods-options-list-item-content" @click="onOptionItemClick(item,index)">
          <span class="goods-options-list-item-content-name" :class="{'goods-options-list-item-content-name-active': selectOption.id === item.id}">{{item.name}}</span>
          <span class="goods-options-list-item-content-caret" v-if="item.subs.length>0" :class="[selectOption.id === item.id && isShowSubContent ? 'goods-options-list-item-content-caret-open': 'goods-options-list-item-content-caret-close',isShowRedCaret?'caret-red':'caret-gory']"></span>
        </a>
      </li>
    </ul>
<!--    子选项-->
    <transition name="fold-height">
      <div class="options-sub-content z-index-2" v-show="isShowSubContent">
        <ul class="options-sub-content-list">
          <li class="options-sub-content-list-item" v-for="(item,index) in selectOption.subs" :key="index">
            <a href="javascript:;" class="options-sub-content-list-item-content" @click="onSubOptionItemClick(item,index)">
              <span class="options-sub-content-list-item-content-name" :class="{'options-sub-content-list-item-content-name-active': selectOption.id === item.id}">{{item.name}}</span>
              <img src="@img/options-select.svg" alt="" v-show="selectOption.id === item.id" class="options-sub-content-list-item-content-select">
            </a>
          </li>
        </ul>
      </div>
    </transition>

<!--    遮罩层-->
    <div class="cover" v-show="isShowSubContent" @click="isShowSubContent = false"></div>
  </div>
</template>

<script>
export default {
  name: 'GoodsOptions',
  data: function () {
    return {
      // 筛选项数据源
      optionsData: [
        {
          id: '1',
          name: '默认',
          subs: [
            {
              id: '1',
              name: '默认'
            },
            {
              id: '1-2',
              name: '价格由高到低'
            },
            {
              id: '1-3',
              name: '销量由高到低'
            }
          ]
        },
        {
          id: '2',
          name: '有货优先',
          subs: []
        },
        {
          id: '3',
          name: '直营优先',
          subs: []
        }
      ],
      // 选中的筛选项
      selectOption: {},
      // 是否显示子选项
      isShowSubContent: false,
      // 是否显示红色三角
      isShowRedCaret: false
    }
  },
  created () {
    this.selectOption = this.optionsData[0]
    this.isShowRedCaret = true
  },
  methods: {
    onOptionItemClick: function (item, index) {
      console.log(item)
      this.$emit('sortType', item.id)
      console.log(index)
      // this.selectOption.id = index
      // this.selectOption.item = item
      if (index === 0 && item.subs.length > 0) {
        if (this.isShowSubContent) {
          this.isShowSubContent = false
        } else {
          this.isShowSubContent = true
        }
        this.isShowRedCaret = true
      } else {
        this.isShowSubContent = false
        this.isShowRedCaret = false
      }

      this.selectOption = item
    },
    onSubOptionItemClick (item, index) {
      this.selectOption = item
      this.$emit('sortType', item.id)
      this.optionsData.forEach(options => {
        options.subs.forEach(subOptions => {
          if (subOptions.id === this.selectOption.id) {
            options.id = subOptions.id
            options.name = subOptions.name
          }
        })
      })

      this.isShowSubContent = false
    }

  }
}
</script>

<style lang="scss">
@import "../../assets/css/style";
.goods-options{
  width: 100%;
  border-bottom: 1px solid $lineColor;
  font-size: pxToRem(16);
  // 一级选项
  &-list{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: pxToRem(46);
    background-color: white;

    &-item{
      display: flex;
      justify-content: center;
      align-items: center;

      &-content{
        text-align: center;
        font-size: pxToRem(16);
        text-decoration: none;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        color: #000;
        &-name{
          font-size: $infoSize;
          margin-right: $marginSize;
          display: inline-block;
          width: 100%;
          &-active{
            color: $mainColor;
          }
        }
        // 三角动画
        &-caret{
          // 子选项展开时，三角动画
          &-open{
            transform: rotate(-180deg);
            transition: all .3s;
          }
          // 子选项关闭时，三角动画
          &-close{
            transform: rotate(0deg);
            transition: all .3s;
          }
        }
      }
    }
  }

   //子选项css
  .options-sub-content{
    position: absolute;
    width: 100%;
    max-height: pxToRem(180);
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    color: #333;
    &-list {
      &-item {
        &-content{
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: pxToRem(44);
          box-sizing: border-box;
          text-decoration: none;
          color: #000;
          &-name{
            font-size: $infoSize;
            display: inline-block;
            flex-grow: 1;
            &-active{
              color: $mainColor;
            }
          }
          &-select {
            width: pxToRem(18);
            height: pxToRem(18);
          }
        }
      }
    }
  }

  // 子选项内容展开动画
  .fold-height-enter-active{
    animation-duration: .3s;
    animation-name: fold-height-open;
  }

  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }

    100% {
      max-height: pxToRem(180);
    }
  }

  // 子选项内容关闭动画
  .fold-height-leave-active{
    animation-duration: .3s;
    animation-name: fold-height-close;
  }

  @keyframes fold-height-close {
    0% {
      max-height: pxToRem(180);
    }

    100% {
      max-height: 0;
    }
  }
}
</style>
