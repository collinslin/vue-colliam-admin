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
	import {
		computed,
		defineComponent,
		ref,
		provide,
		ComputedRef,
		inject,
	} from '@vue/runtime-core'
	import { RouteRecordRaw, useRoute } from 'vue-router'
	import { useStore } from 'vuex'
	import sidebarItem from './components/sidebarItem.vue'

	export default defineComponent({
		name: 'Menu',
		components: { sidebarItem },
		setup() {
			const store = useStore()
			const route = useRoute()
			const menuData = inject('menuData') as ComputedRef<RouteRecordRaw[]>
			// const defaultActive = ref(route.path)
			const defaultActive = computed(() => route.path)
			const openMenu = (menuRoute: string) => {
				menuData.value.forEach((route: RouteRecordRaw | any) => {
					if (`/${route.path}` === menuRoute) {
						route.active = true
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
