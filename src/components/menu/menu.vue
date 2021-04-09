<template>
  <div>
    <el-scrollbar
      :noresize="true"
      class="menu-nav"
      wrap-class="scrollbar-wrapper"
      :style="{ width: menuWidth }"
    >
      <el-menu
        :uniqueOpened="true"
        :router="true"
        :default-active="defaultActive"
        :collapse="isCollapse"
        :collapse-transition="false"
        @open="openMenu"
      >
        <sidebar-item
          v-for="item in menuData"
          :key="item.path"
          :item="item"
          :basePath="item.path"
          :class="{ 'item-active': item.active }"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from '@vue/runtime-core'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import sidebarItem from './components/sidebarItem.vue'

  export default defineComponent({
    name: 'Menu',
    components: { sidebarItem },
    setup() {
      const store = useStore()
      const menuData = computed(() => store.state.setting.menuData)
      const route = useRoute()
      const defaultActive = ref(route.path)
      const openMenu = (menuRoute: string) => {
        menuData.value.forEach((route: any) => {
          if (route.path === menuRoute) {
            route.active = true
            defaultActive.value = route.path
          } else {
            route.active = false
          }
        })
      }
      const isCollapse = computed(() => store.state.setting.isCollapse)
      const menuWidth = computed(() => store.state.setting.menuWidth + 'px')

      return { isCollapse, menuWidth, menuData, defaultActive, openMenu }
    },
  })
</script>

<style lang="scss" scoped>
  .menu-nav {
    position: fixed;
    width: 250px;
    height: 100%;
    background-color: #fff;
    transition: width 0.28s;
  }

  .menu-min-width {
    width: 64px !important;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
</style>

<style lang="scss" scoped>
  // element-ui
  .el-scrollbar {
    width: 100%;
  }

  .el-menu {
    border: none;
  }

  .item-active {
    :deep(.el-submenu__title) {
      color: #40a0ff;
    }
  }
</style>
