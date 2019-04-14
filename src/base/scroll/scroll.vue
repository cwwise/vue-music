<template>
  <div ref="warpper">
    <slot> </slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: []
    }
  },
  mounted() {
    setInterval(() => {
      this._initScroll()
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.warpper) {
        return
      }
      this.scroll = new BScroll(this.$refs.warpper, {
        click: this.click
      })
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20);
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
