<template>
  <template v-if="!item.children">
    <el-menu-item :index="resolvePath(item.path)">
      <i class="el-icon-menu"></i>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
  </template>

  <el-submenu v-else :index="resolvePath(item.path)">
    <template #title>
      <i class="el-icon-location"></i>
      <span>{{ item.name }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :basePath="resolvePath(child.path)"
    ></sidebar-item>
  </el-submenu>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from '@vue/runtime-core'
  import { useRouter } from 'vue-router'
  import { isExternal } from '/@/utils/utils'
  export default defineComponent({
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true,
      },
      basePath: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const router = useRouter()
      const routesList = router.getRoutes()
      const resolvePath = (routerPath: string) => {
        if (isExternal(routerPath)) {
          return routerPath
        }
        if (isExternal(props.basePath)) {
          return props.basePath
        }
        return routesList.find((route) => route.name == props.item.name)?.path
      }

      onMounted(() => {
        console.log(routesList, '5546')
      })

      return {
        resolvePath,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
