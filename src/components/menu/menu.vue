<template>
	<el-menu
		:uniqueOpened="true"
		:router="true"
		:default-active="defaultActive"
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
</template>

<script lang="ts">
	import { computed, defineComponent, ref } from '@vue/runtime-core'
	import { useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import sidebarItem from './components/sidebarItem.vue'

	export default defineComponent({
		name: 'Menu',
		components: { sidebarItem },
		setup() {
			const store = useStore()
			const router = useRouter()
			const menuData = computed(() => store.state.setting.menuData)
			const defaultActive = ref('')
			console.log(router.getRoutes(),123123)

			console.log(menuData.value)
			const openMenu = (menuRoute: string) => {
				menuData.value.forEach((route: any) => {
					if (route.path === menuRoute) {
						route.active = true
						defaultActive.value = route.path
					} else {
						route.active = false
					}
				})
				console.log(menuData.value)
			}

			return { menuData, defaultActive, openMenu }
		},
	})
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
	// element-ui
	.item-active {
		:deep(.el-submenu__title) {
			color: #40a0ff;
		}
	}
</style>
