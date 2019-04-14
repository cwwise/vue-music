<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <div class="list-title">热门歌单推荐</div>
        <ul>
          <li class="item" v-for="item in discList" :key="item.id">
            <div class="icon">
              <img :src="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Slider from '@/base/slider/slider'
  import Scroll from '@/base/scroll/scroll'

  import {getRecommend, getDiscList} from '@/api/recommend'
  import {ERR_OK} from '@/api/config'

  export default {
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    components: {
      Slider,
      Scroll
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code == ERR_OK) {
            this.recommends = res.data.slider;
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code == ERR_OK) {
            this.discList = res.data.list
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
 @import "~@/common/stylus/variable";
    .recommend
      position: fixed
      width: 100%
      top: 88px
      bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .list-title
        text-align center
        line-height 65px
        color $color-theme
        font-size $font-size-medium
      .item
        display flex
        align-items center
        padding 0 20px 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
          img 
            height 60px
            width 60px
        .text
          display flex
          flex-direction column
          justify-content center
          overflow hidden
          line-height 20px
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color $color-text
          .desc
            color $color-text-d
    
</style>
