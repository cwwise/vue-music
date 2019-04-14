<template>
<div class="slider" ref="slider">
  <div class="slider-group" ref="sliderGroup">
    <slot>

    </slot>
  </div>
  <div class="dots">
    <span class="dot" v-for="(item, index) in dots" 
    v-bind:class="{active: (currentPageIndex === index)}"
    :key="index">
      
    </span>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import {
  addClass
} from '@/common/js/dom';

export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  deactivated() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', ()=> {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let silderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = silderWidth + 'px'
        width += silderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * silderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(
        this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400,
          },
          click: true
        })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      })
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next(400);
      }, this.interval);
    }
  }

}
</script>

<style lang="stylus" scoped>

  @import "~@/common/stylus/variable";
  .slider
    position relative
    min-height 1px
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        text-align center
        a
          display block
          width 100%
          text-decoration none 
        img 
          display block
          width 100%
    .dots
      position absolute
      right 0
      left 0
      bottom 12px
      font-size 0
      text-align center
      .dot
        margin 0 4px
        display inline-block
        border-radius 50%
        background-color $color-text-l
        width 8px
        height 8px
        &.active
          width 20px
          border-radius 5px
          background-color $color-text-ll



</style>
