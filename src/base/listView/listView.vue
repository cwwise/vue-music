<template>
  <scorll class="listView" :data="data"> 
    <ul>
      <li v-for="group in data" :key="group.id"></li>
    </ul>
  </scorll>
</template>

<script>

import Scorll from '@/base/scorll/scorll'

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Scorll
  }
}
</script>

<style lang="stylus" scoped>

</style>
