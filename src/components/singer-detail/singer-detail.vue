<template>
    <transition name="test-slide">
        <div class="singer-detail"></div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
  }
}
</script>

<style lang="stylus" scoped>

  @import "~@/common/stylus/variable"
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background-color $color-background

  .test-slide-enter-active,.test-slide-leave-active
    transition all 1.3s
  .test-slide-enter
    transform translateX(100%)
  .test-slide-leave-to
    transform translateX(100%)
    // transform translate3d(100%, 0, 0)

</style>
