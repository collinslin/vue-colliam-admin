<template>
  <div id="luckysheet"></div>
</template>

<script lang="ts">
  import {
    computed,
    watch,
    defineComponent,
    reactive,
    onMounted,
    nextTick,
  } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  import { Index } from '/@/type/store'

  export default defineComponent({
    setup() {
      const store = useStore<Index>()
      const luckysheetConfig = reactive({
        container: 'luckysheet', //luckysheet为容器id
        lang: 'zh', //语言
        showinfobar: false,
      })

      const initLuckysheet = () => {
        window.luckysheet.create(luckysheetConfig)
      }

      const isCollapse = computed(() => {
        return store.state.setting!.isCollapse
      })

      watch(isCollapse, () => {
        setTimeout(() => {
          window.luckysheet.resize()
        }, 300)
      })

      onMounted(() => {
        nextTick(() => {
          initLuckysheet()
        })
      })

      return {}
    },
  })
</script>

<style lang="scss" scoped>
  #luckysheet {
    width: 100%;
    height: calc(100vh - 110px);
    transition: all 0.3s;
  }
</style>
