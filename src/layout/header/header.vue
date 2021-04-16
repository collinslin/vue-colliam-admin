<template>
	<el-icon
		class="change-collapse-btn"
		:class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
		@click="changeCollapse"
	></el-icon>
	<ul class="header-btn-nav">
		<li class="search-nav">
			<el-autocomplete
				v-model="searchVal"
				value-key="name"
				placeholder="站内搜索"
				:fetch-suggestions="search"
				@select="clickSearchDataItem"
			>
				<template #prefix>
					<el-icon class="el-icon-search"></el-icon>
				</template>
			</el-autocomplete>
		</li>
		<li class="message-nav el-icon-message"></li>
		<el-dropdown>
			<li class="user-nav">
				<HeaderUser></HeaderUser>
			</li>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item
						v-for="(item, index) in userDropdownMenu"
						:key="index"
						:icon="item.icon"
						@click="clickUserDropdownItem(item.type)"
					>
						{{ item.name }}</el-dropdown-item
					>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</ul>
</template>

<script lang="ts">
	import { computed, ComputedRef, defineComponent, inject, Ref, ref } from 'vue'
	import { RouteRecordRaw, useRouter } from 'vue-router'
	import { useStore } from 'vuex'
	import { UserDropdownMethods } from '.'
	import HeaderUser from './headerUser.vue'
	import Dropdown, { DropdownMenu } from '/@/components/dropdown/dropdown.vue'

	export default defineComponent({
		name: 'Header',
		components: { HeaderUser, Dropdown },
		setup() {
			const store = useStore()
			const router = useRouter()
			const isCollapse = computed(() => store.state.setting.isCollapse)
			const changeCollapse = () => {
				store.state.setting.isCollapse = !store.state.setting.isCollapse
				if (store.state.setting.isCollapse) {
					store.state.setting.menuWidth = 64
				} else {
					store.state.setting.menuWidth = 210
				}
			}

			/**搜索模块 */
			const searchVal = ref('')
			const isShowSearchInp = ref(false)
			const searchData: Ref<any[]> = ref([])
			const menuData = inject('menuData') as ComputedRef<RouteRecordRaw[]>
			const routerList = router.getRoutes()
			initSearchData(menuData.value)
			function initSearchData(rawData: RouteRecordRaw[]) {
				rawData.forEach((item) => {
					if (!item.children?.length) {
						if (item.meta?.isAppView || !item.meta?.link) {
							const target = routerList.find(
								(router) => router.name == item.name
							)
							searchData.value.push(target)
						}
					} else {
						initSearchData(item.children)
					}
				})
			}
			const ShowSearchInp = () => {
				isShowSearchInp.value = true
			}
			const clickSearchDataItem = (item: RouteRecordRaw) => {
				searchVal.value = ''
				router.push(item.path)
			}
			const search = (queryString: string, callback: any) => {
				const results = queryString
					? searchData.value.filter(
							(item) =>
								item.path.includes(queryString) ||
								item.name.includes(queryString)
					  )
					: searchData.value
				callback && callback(results)
			}

			/**用户信息模块 */
			const userDropdownMenu: DropdownMenu[] = [
				{
					icon: 'el-icon-user-solid',
					name: '个人中心',
					type: 'mine',
				},
				{
					icon: 'el-icon-s-tools',
					name: '设置',
					type: 'setting',
				},
				{
					icon: 'el-icon-switch-button',
					name: '退出登录',
					type: 'logout',
				},
			]
			const userDropdownMethods: UserDropdownMethods = {
				mine: () => {},
				setting: () => {},
				logout: () => router.push({ path: '/login' }),
			}
			const clickUserDropdownItem = (type: string) => {
				userDropdownMethods[type] && userDropdownMethods[type]()
			}

			return {
				isCollapse,
				changeCollapse,
				searchVal,
				ShowSearchInp,
				isShowSearchInp,
				searchData,
				clickSearchDataItem,
				search,
				userDropdownMenu,
				clickUserDropdownItem,
			}
		},
	})
</script>

<style lang="scss" scoped>
	.change-collapse-btn {
		border: none;
		font-size: 30px;
		border-radius: 10px;
		transition: all 0.2s;
		&:hover {
			color: rgb(83, 168, 255);
		}
	}

	.header-btn-nav {
		position: absolute;
		display: flex;
		align-items: center;
		height: 60px;
		right: 0;
		li {
			height: 100%;
			padding: 0 10px;
			margin: 0 5px;
			line-height: 60px;
			font-size: 18px;
			transition: all 0.3s;
			&:hover {
				background-color: rgb(244, 244, 245);
				color: rgb(83, 168, 255);
			}
		}
	}

	.search-nav {
		display: flex;
		align-items: center;
	}
</style>
