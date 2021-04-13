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
	<div class="tabbar-menu-nav" v-show="showTabbarMenu">
		<TabbarMenu></TabbarMenu>
	</div>
</template>

<script lang="ts">
	import {
		computed,
		ComputedRef,
		defineComponent,
		inject,
	} from '@vue/runtime-core'
	import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import ArrRemove from 'lodash/remove'
	import { Index } from '/@/type/store'
	import TabbarMenu from './tabbarMenu.vue'

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
				menuData.value.forEach((menu: RouteRecordRaw | any) => {
					if (path.includes(menu.path)) {
						menu.active = false
					} else {
						menu.active = true
					}
				})
				if (store.state.setting) {
					store.state.setting.tabbarData = ArrRemove(
						store.state.setting.tabbarData,
						(item) => item.path !== path
					)

					const pushPath =
						store.state.setting.tabbarData[
							store.state.setting.tabbarData.length - 1
						].path
					router.push(pushPath)
				}
			}

			const showTabbarMenu = (e: MouseEvent) => {
				console.log(e.target)
			}

			return {
				route,
				tabbarDataValue,
				tabbarData,
				chooseTabbar,
				removeTabbar,
				showTabbarMenu,
			}
		},
	})
</script>

<style lang="scss" scoped>
	.tabbar-menu-nav {
		position: absolute;
	}
</style>
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
