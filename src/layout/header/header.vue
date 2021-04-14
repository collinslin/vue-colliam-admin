<template>
	<el-icon
		class="change-collapse-btn"
		:class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
		@click="changeCollapse"
	></el-icon>
	<ul class="header-btn-nav">
		<li class="search-nav el-icon-search"></li>
		<li class="message-nav el-icon-message"></li>
		<el-popover placement="top-start" :width="100" trigger="hover">
			<Dropdown :dropdownMenu="dropdownMenu"></Dropdown>
			<template #reference>
				<li class="user-nav">
					<HeaderUser></HeaderUser>
				</li>
			</template>
		</el-popover>
	</ul>
	<!-- <el-input v-model="searchVal"></el-input> -->
</template>

<script lang="ts">
	import { computed, defineComponent, reactive, ref } from '@vue/runtime-core'
	import { useStore } from 'vuex'
	import HeaderUser from './headerUser.vue'
	import Dropdown, { DropdownMenu } from '/@/components/dropdown/dropdown.vue'

	export default defineComponent({
		name: 'Header',
		components: { HeaderUser, Dropdown },
		setup() {
			const store = useStore()
			const isCollapse = computed(() => store.state.setting.isCollapse)
			const changeCollapse = () => {
				store.state.setting.isCollapse = !store.state.setting.isCollapse
				if (store.state.setting.isCollapse) {
					store.state.setting.menuWidth = 64
				} else {
					store.state.setting.menuWidth = 210
				}
			}

			const searchVal = ref('')

			const dropdownMenu: DropdownMenu[] = reactive([
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
			])
			return {
				isCollapse,
				changeCollapse,
				searchVal,
				dropdownMenu,
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
</style>
