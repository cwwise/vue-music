<template>
  <div class="singer">
  </div>
</template>

<script>
  import { getSingerList } from '@/api/singer'
  import Singer from '@/common/js/singer'
  import {ERR_OK} from '@/api/config'

  const Hot_Length = 10
  const Hot_Title = '热门'

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
            console.log(this.singers);
            
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: Hot_Title,
            items: []
          }
        }

        list.forEach((item, index) => {
          if (index < Hot_Length) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_id,
              name: item.Fsinger_name,
            }))
          }
          // 如果对应数据不存在，则初始化一个值
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
              id: item.Fsinger_id,
              name: item.Fsinger_name,
          }))
        });
        
        // 排序
        let hot = []
        let ret = []
        for(let key in map) {
          let value = map[key]
          if (value.title.match(/[a-zA-Z]/)) {
            ret.push(value)
          } else if (value.title === Hot_Title) {
            hot.push(value)
          }
        }

        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    }

  }
</script>

<style lang="stylus" scoped>

</style>