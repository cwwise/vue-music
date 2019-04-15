<template>
  <div class="loading">
    <img class="image" src="./loading.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variable"
  .loading
    width 100%
    display flex
    flex-direction column
    align-items center
    .image
      width 24px
      height 24px
    .desc
      line-height 20px
      font-size $font-size-samll
      color $color-text-l


</style>
