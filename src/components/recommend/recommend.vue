<template>
  <div class="recommend">
    <div v-if="recommends.length" class="slider-wrapper">
      <slider>
        <div v-for="item in recommends" :key="item.id">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="">
          </a>
        </div>
      </slider>
    </div>

  </div>
</template>

<script>
  import Slider from '@/base/slider/slider'
  import {getRecommend} from '@/api/recommend'
  import {ERR_OK} from '@/api/config'

  export default {
    data() {
      return {
        recommends: []
      }
    },
    created() {
      this._getRecommend()
    },
    components: {
      Slider
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code == ERR_OK) {
            this.recommends = res.data.slider;
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

    .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
</style>
