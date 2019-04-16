<template>
  <scroll class="listview" :data="data"> 
    <ul>
      <li v-for="group in data" :key="group.id">
        <p>{{group.title}}</p>
        <ul>
          <li v-for="item in group.items" :key="item.id">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script>

import Scroll from '@/base/scroll/scroll'

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>

  
</style>
