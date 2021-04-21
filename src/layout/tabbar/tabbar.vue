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
			:label="item.meta.title"
			:name="item.path"
			:closable="item.meta.isCloseTabbar == false ? false : true"
		>
		</el-tab-pane>
	</el-tabs>
	<transition name="el-zoom-in-top">
		<DropdownNav
			:left="left"
			v-show="isShow"
			@click-tabbar-menu="chooseTabbarMenu"
		></DropdownNav>
	</transition>
</template>

<script lang="ts">
	import {
		computed,
		defineComponent,
		onMounted,
		onUnmounted,
		ref,
	} from '@vue/runtime-core'
	import { useRoute, useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import { Index } from '/@/type/store'
	import DropdownNav from '/@/components/dropdown/dropdownNav.vue'
	import { ElMessage } from 'element-plus'
	import { changeMenuStyle } from '/@/utils/menu-utils'

	export default defineComponent({
		name: 'Tabbar',
		components: { DropdownNav },
		setup() {
			const store = useStore<Index>()
			const route = useRoute()
			const router = useRouter()

			/**当前激活的tabbarItem */
			const tabbarDataValue = computed({
				get: () => route.path,
				set: () => route.path,
			})

			/**tabbar列表 */
			const tabbarData = computed(() => store.state.setting?.tabbarData)

			const cachedTabsStr = sessionStorage.getItem(
				import.meta.env.VITE_APP_TABBAR
			)
			if (cachedTabsStr && store.state.setting) {
				try {
					store.state.setting.tabbarData = JSON.parse(cachedTabsStr)
				} catch (error) {
					console.warn('failed to load cached tabs, got exception:', error)
				} finally {
					sessionStorage.removeItem(import.meta.env.VITE_APP_TABBAR)
				}
			}

			/**tabbarItem的点击事件 */
			const chooseTabbar = (tabbar: any) => {
				changeMenuStyle(tabbar.props.name)
				router.push(tabbar.props.name)
			}

			/**tabbarItem的删除事件 */
			const removeTabbar = (path: string) => {
				if (path.includes('home')) {
					ElMessage({
						message: '首页无法删除',
						type: 'error',
					})
					return
				}
				const index = findTargetIndex(path) as number
				index && index != -1 && tabbarData.value!.splice(index, 1)
				if (tabbarDataValue.value === path) {
					const pushPath = tabbarData.value![index - 1].path as string
					changeMenuStyle(pushPath)
					router.push(pushPath)
				}
			}

			/**tabbar菜单栏的删除左侧和右侧事件 */
			const closeLR = (targetPath: string, type: number) => {
				const index = findTargetIndex(targetPath)
				const spliceList = type
					? tabbarData.value!.splice(index + 1, tabbarData.value!.length)
					: tabbarData.value!.splice(1, index - 1)
				spliceList?.forEach((item) => {
					if (item.active) {
						changeMenuStyle(targetPath)
						router.push(targetPath)
					}
				})
			}

			/**找到对应tabbarItem的index */
			const findTargetIndex = (path: string): number => {
				const index = tabbarData.value!.findIndex(
					(item) => item.path == path
				) as number
				return index
			}

			/**tabbar右击事件 */
			const isShow = ref(false)
			const left = ref(0)
			let targetPath = ''
			const showTabbarMenu = (e: MouseEvent) => {
				const target = e.target as HTMLElement
				const targetClassList = Array(target.classList)
				if (targetClassList[0][0] == 'el-tabs__item') {
					const ElOffsetLeft = target.offsetLeft
					const ElOffsetWidth = target.offsetWidth / 2
					left.value = ElOffsetLeft + ElOffsetWidth - 60
					const targetID = target.id
					targetPath = targetID.split('tab-')[1]
					isShow.value = true
				}
			}

			/**tabbar菜单栏的Item点击事件 */
			const typeList: { [key: string]: (targetPath: string) => void } = {
				refresh: (targetPath) => {
					const routerList = router.getRoutes()
					const target = routerList.find((item) => item.path == targetPath)
					const flag = store.state.routerStore?.keepAliveInclude.findIndex(
						(item) => item == target?.name
					) as number
					if (flag > -1) {
						store.state.routerStore?.keepAliveInclude.splice(flag, 1)
					}
					router.replace({ path: `/redirect${targetPath}`, query: route.query })
				},
				close: (targetPath) => removeTabbar(targetPath),
				closeLeft: (targetPath) => closeLR(targetPath, 0),
				closeRight: (targetPath) => closeLR(targetPath, 1),
				closeAll: (targetPath) => {
					const targetIndex = findTargetIndex(targetPath)
					const target = tabbarData.value!.find(
						(item, index) => targetIndex == index
					)
					if (store.state.setting) {
						store.state.setting.tabbarData = target
							? [tabbarData.value![0], target]
							: [tabbarData.value![0]]
						if (!target?.active) {
							changeMenuStyle(targetPath)
							router.push(targetPath)
						}
					}
				},
			}
			const chooseTabbarMenu = (type: string) => {
				typeList[type] && typeList[type](targetPath)
			}

			onMounted(() => {
				window.addEventListener('click', () => {
					isShow.value = false
				})
				window.addEventListener('beforeunload', () => {
					if (tabbarData.value?.length! > 0) {
						sessionStorage.setItem(
							import.meta.env.VITE_APP_TABBAR,
							JSON.stringify(tabbarData.value)
						)
					}
				})
			})

			onUnmounted(() => {
				window.removeEventListener('click', () => {})
				window.removeEventListener('beforeunload', () => {})
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
	:deep(.el-tabs__nav-prev),
	:deep(.el-tabs__nav-next) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 100%;
		font-size: 20px;
		font-weight: bold;
		color: #000;
		background-color: #ffffff;
		z-index: 3;
	}
</style>
