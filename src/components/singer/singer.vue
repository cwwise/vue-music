<template>
  <div class="singer">
    <listview @select="selectSinger" class="listview" :data="singers"> 
    </listview>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getSingerList } from '@/api/singer'
  import Singer from '@/common/js/singer'
  import {ERR_OK} from '@/api/config'
  import Listview from "@/base/listview/listview";
  import {mapMutations} from 'vuex'

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
    components: {
      Listview
    },
    methods: {
      selectSinger(singer) {        
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)                
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
              mid: item.Fsinger_mid
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
              mid: item.Fsinger_mid
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
        // 排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'Set_Singer'
      })
    }

  }
</script>

<style lang="stylus" scoped>
  .singer
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .listview
      height: 100%
      overflow: hidden 

</style>