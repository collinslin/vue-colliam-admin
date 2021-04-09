<template>
	<div>
		<Menu></Menu>
		<div
			class="vertical"
			:style="{
				marginLeft: `${verticalMargin}px`,
				width: `${verticalWidth}px`,
			}"
		>
			<el-header>
				<Header></Header>
			</el-header>
			<el-main>
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
	import {
		computed,
		defineComponent,
		onMounted,
		ref,
		watch,
	} from '@vue/runtime-core'
	import { useStore } from 'vuex'

	export default defineComponent({
		nane: 'RootView',
		components: { Menu, Header, PageView },
		setup() {
			const store = useStore()
			const isCollapse = computed(() => store.state.setting.isCollapse)
			const verticalMargin = computed(() => store.state.setting.menuWidth)
			const verticalWidth = ref(window.innerWidth - verticalMargin.value)
			onMounted(() => {
				window.onresize = () => {
					verticalWidth.value = window.innerWidth - verticalMargin.value
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
				verticalWidth.value = window.innerWidth - verticalMargin.value
			})
			return {
				verticalMargin,
				verticalWidth,
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
		transition: all 0.28s;
	}

	.el-main {
		height: calc(100vh - 56px);
		overflow-y: auto;
	}

	.el-scrollbar {
		background-color: #fff;
	}
</style>
