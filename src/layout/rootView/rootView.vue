<template>
	<div>
		<Menu></Menu>
		<div
			class="vertical"
			:style="{
				marginLeft: `${menuWidth}px`,
				width: `${verticalWidth}px`,
			}"
		>
			<el-header>
				<Header></Header>
			</el-header>
			<el-main>
				<Tabbar></Tabbar>
				<el-scrollbar>
					<PageView></PageView>
				</el-scrollbar>
			</el-main>
		</div>
	</div>
</template>

<script lang="ts">
	import Menu from '/@/components/menu'
	import Header from '../header'
	import PageView from '../pageView'
	import Tabbar from '../tabbar'
	import {
		computed,
		ComputedRef,
		defineComponent,
		onMounted,
		provide,
		ref,
		watch,
	} from '@vue/runtime-core'
	import { useStore } from 'vuex'
	import { RouteRecordRaw, useRoute } from 'vue-router'

	export default defineComponent({
		nane: 'RootView',
		components: { Menu, Header, PageView, Tabbar },
		setup() {
			const store = useStore()
			const route = useRoute()
			const isCollapse = computed(() => store.state.setting.isCollapse)
			const menuWidth = computed(() => store.state.setting.menuWidth)
			const verticalWidth = ref(window.innerWidth - menuWidth.value)

			const menuData: ComputedRef<RouteRecordRaw[]> = computed(
				() => store.state.setting.menuData
			)

			onMounted(() => {
				window.onresize = () => {
					verticalWidth.value = window.innerWidth - menuWidth.value
					if (window.innerWidth < 700) {
						store.state.setting.isCollapse = true
						store.state.setting.menuWidth = 64
					} else {
						store.state.setting.isCollapse = false
						store.state.setting.menuWidth = 210
					}
				}
			})

			watch(isCollapse, () => {
				verticalWidth.value = window.innerWidth - menuWidth.value
			})

			provide('menuData', menuData)

			const useElScrollbar = computed(() => {
				if (route.meta.isAppView) {
					return false
				} else {
					return true
				}
			})

			return {
				menuWidth,
				verticalWidth,
				useElScrollbar,
			}
		},
	})
</script>

<style lang="scss" scoped>
	.vertical {
		position: fixed;
		transition: all 0.28s;
	}
</style>

<style lang="scss" scoped>
	//elementui
	.el-header {
		display: flex;
		align-items: center;
		padding: 0 20px;
		background-color: #fff;
		box-shadow: 0px -3px 20px 0px rgb(0 0 0 / 50%);
		transition: all 0.28s;
	}

	.el-main {
		height: calc(100vh - 76px);
		padding: 10px 20px;
		overflow: hidden;
	}

	.el-scrollbar {
		background-color: #fff;
	}
</style>
