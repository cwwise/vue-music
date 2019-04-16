<template>
  <scroll class="listview" 
          :data="data" 
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll"
          ref="listview">  
    <ul>
      <li class="list-group" v-for="group in data" :key="group.title" ref="listGroup">
        <p class="list-group-title">{{group.title}}</p>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.id">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 滚动提示 -->
    <div class="list-shortcut" v-on:touchstart="onShortcutStart" v-on:touchmove.stop.prevent="onShortcutMove">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :key="item" :data-index="index" :class="{'current': currentIndex == index}">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>

import Scroll from '@/base/scroll/scroll'

export default {
  created() {
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
    this.probeType = 3
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    }
  },
  components: {
    Scroll
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      for (let i = 0; i < listHeight.length; i ++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || (-newY > height1 && -newY < height2)) {
          this.currentIndex = i
          console.log(i);
          return
        }
      }
      this.currentIndex = 0
    }
  },
  methods: {
    onShortcutStart(e) {
      const name = 'data-index'
      const index = e.target.getAttribute(name)
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.index = index
      this._scrollTo(index)
    },
    onShortcutMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 字体高度+padding
      let shortHeight = 18
      let delta = (this.touch.y2 - this.touch.y1)/shortHeight | 0
      let index = parseInt(this.touch.index) + delta
      this._scrollTo(index)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i ++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/variable"

  .listview
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom 20px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        padding: 20px 0 0 15px
        display flex
        align-items center
        .avatar
          width 50px
          height 50px
          border-radius 50%
        .name 
          margin-left 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      text-align center
      background $color-background-d
      font-family Arial, Helvetica, sans-serif
      .item
        padding 3px
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-theme

  
</style>
