<template>
	<el-container>
		<el-aside class="menu-aside">
			<Menu />
		</el-aside>
		<el-container>
			<el-header>Header</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts">
	import Menu from '/@/components/menu'
	import { defineComponent } from '@vue/runtime-core'

	export default defineComponent({
		nane: 'RootView',
		components: { Menu },
		setup() {
			return {}
		},
	})
</script>

<style lang="scss" scoped>
	.menu-aside {
		height: 100vh;
		background-color: #fff;

		scrollbar-color: rgb(198, 226, 255);
		scrollbar-width: thin;
		-ms-overflow-style: none;
		position: relative;
		&::-webkit-scrollbar {
			width: 6px;
			height: 1px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 3px;
			background: #0080ff;
		}
		&::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
			box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
			border-radius: 3px;
			background: rgb(198, 226, 255);
		}
	}
</style>
