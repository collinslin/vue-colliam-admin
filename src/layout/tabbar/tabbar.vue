<template>
  <el-tabs
    class="my-tabs"
    v-model="tabbarDataValue"
    type="card"
    @tab-click="chooseTabbar"
    @tab-remove="removeTabbar"
    @contextmenu.prevent="showTabbarMenu"
  >
    <el-tab-pane
      v-for="item in tabbarData"
      :key="item.path"
      :label="item.name"
      :name="item.path"
      :closable="item.meta.isCloseTabbar == false ? false : true"
    >
    </el-tab-pane>
  </el-tabs>
  <transition name="el-zoom-in-top">
    <TabbarMenu
      :left="left"
      v-show="isShow"
      @choose-tabbar-menu="chooseTabbarMenu"
    ></TabbarMenu>
  </transition>
</template>

<script lang="ts">
  import {
    computed,
    ComputedRef,
    defineComponent,
    inject,
    onMounted,
    onUnmounted,
    ref,
  } from '@vue/runtime-core'
  import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { Index } from '/@/type/store'
  import TabbarMenu from './tabbarMenu.vue'
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    name: 'Tabbar',
    components: { TabbarMenu },
    setup() {
      const store = useStore<Index>()
      const route = useRoute()
      const router = useRouter()

      const menuData = inject('menuData') as ComputedRef<RouteRecordRaw[]>

      const tabbarDataValue = computed({
        get: () => route.path,
        set: () => route.path,
      })

      const tabbarData = computed(() => store.state.setting?.tabbarData)

      const chooseTabbar = (tabbar: any) => {
        router.push(tabbar.props.name)
      }

      const removeTabbar = (path: string) => {
        if (path.includes('home')) {
          ElMessage({
            message: '首页无法删除',
            type: 'error',
          })
          return
        }
        menuData.value.forEach((menu: RouteRecordRaw | any) => {
          if (path.includes(menu.path)) {
            menu.active = false
          } else {
            menu.active = true
          }
        })
        if (store.state.setting) {
          const index = store.state.setting.tabbarData.findIndex(
            (item) => item.path == path
          )
          index != -1 && store.state.setting.tabbarData.splice(index, 1)

          const pushPath =
            store.state.setting.tabbarData[
              store.state.setting.tabbarData.length - 1
            ].path
          router.push(pushPath)
        }
      }

      const isShow = ref(false)
      const left = ref(0)
      const showTabbarMenu = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const ElOffsetLeft = target.offsetLeft
        const ElOffsetWidth = target.offsetWidth / 2
        left.value = ElOffsetLeft + ElOffsetWidth - 60
        isShow.value = true
      }

      const refresh = () => {}
      const myDelete = () => {
        return removeTabbar(route.path)
      }
      const typeList: { [key: string]: any } = {
        refresh,
        myDelete,
      }
      const chooseTabbarMenu = (type: string) => {
        typeList[type] && typeList[type]()
      }

      onMounted(() => {
        window.addEventListener('click', () => {
          isShow.value = false
        })
      })

      onUnmounted(() => {
        window.removeEventListener('click', () => {})
      })

      return {
        route,
        tabbarDataValue,
        tabbarData,
        chooseTabbar,
        removeTabbar,
        isShow,
        left,
        chooseTabbarMenu,
        showTabbarMenu,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
<style lang="scss" scoped>
  //element-ui
  :deep(.el-tabs__header) {
    margin: 0;
    border: none !important;
  }
  :deep(.el-tabs__nav) {
    border: none !important;
  }
  :deep(.el-tabs__item) {
    height: 30px;
    border-right-color: beige;
    background-color: #ccdff2;
    line-height: 30px;
    margin: 0 2px;
    border: none !important;
    transition: all 0.3s !important;
    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: rgb(10, 204, 114);
      border-radius: 50%;
      opacity: 0;
      transition: all 0.2s;
    }
    &:hover {
      background-color: #fff !important;
    }
  }
  :deep(.is-active) {
    background-color: #fff !important;
    &::before {
      opacity: 1;
      transform: translateX(-7px);
    }
  }
</style>
