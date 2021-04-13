<template>
	<el-dropdown trigger="contextmenu">
		<span class="el-dropdown-link"></span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in dropdownMenu"
					:key="item.name"
					:icon="item.icon"
					>{{ item.name }}</el-dropdown-item
				>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script lang="ts">
	import { defineComponent, reactive } from '@vue/runtime-core'

	export default defineComponent({
		name: 'TabbarMenu',
		setup() {
			const dropdownMenu = reactive([
				{
					icon: 'el-icon-refresh',
					name: '刷新页面',
				},
				{
					icon: 'el-icon-delete',
					name: '删除本页',
				},
			])

			return {
				dropdownMenu,
			}
		},
	})
</script>

<style lang="scss" scoped></style>
<style lang="scss" scoped>
	:deep(.el-dropdown-link) {
		display: block !important;
		width: 100px;
		height: 30px;
	}
</style>
