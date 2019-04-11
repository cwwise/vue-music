<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">Chicken Music</div>
  </div>
</template>

<script>
export default {
  name: 'MHeader'
}
</script>


<style lang="stylus" scoped>
  @import "~@/common/stylus/variable";
  @import "~@/common/stylus/mixin";
  
  .m-header
    display flex
    flex-direction row
    justify-content center
    align-items center
    position relative
    height 44px
    text-align center
    color $color-theme
    .icon 
      bg-image("./images/logo")
      width: 30px
      height: 32px
      margin-right: 9px
      background-size: 30px 32px
    .text
      font-size: $font-size-large

</style>
