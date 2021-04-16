<template>
	<template v-if="!item.children && !item.meta.hidden">
		<colliam-link
			:to="resolvePath(item.path)"
			:item="item"
			@click="chooseMenuItem(resolvePath(item.path))"
		>
			<el-menu-item :index="resolvePath(item.path)">
				<i :class="item.meta.icon"></i>
				<template #title>{{ item.name }}</template>
			</el-menu-item>
		</colliam-link>
	</template>

	<el-submenu
		v-if="item.children && !item.meta.hidden"
		:index="resolvePath(item.path)"
		:class="{ 'item-active': item.active }"
	>
		<template #title>
			<i :class="item.meta.icon"></i>
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
	import ColliamLink from './colliamLink.vue'
	import { ComputedRef, defineComponent, inject } from '@vue/runtime-core'
	import { RouteRecordRaw, useRouter } from 'vue-router'
	import { isExternal } from '/@/utils/utils'

	export default defineComponent({
		name: 'sidebarItem',
		components: {
			ColliamLink,
		},
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
			const menuData = inject('menuData') as ComputedRef<RouteRecordRaw[]>
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

			const chooseMenuItem = (path: string) => {
				menuData.value.forEach((route: RouteRecordRaw | any) => {
					if (!path.includes(route.path)) {
						route.active = false
					}
				})
			}

			return {
				resolvePath,
				chooseMenuItem,
			}
		},
	})
</script>

<style lang="scss" scoped>
	.item-active {
		:deep(.el-submenu__title) {
			color: #40a0ff;
		}
	}
</style>
