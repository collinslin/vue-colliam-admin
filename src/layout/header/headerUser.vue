<template>
	<div class="header-user-nav">
		<el-avatar
			src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
			size="small"
		></el-avatar>
		<div class="user-name">colliam</div>
	</div>
</template>

<script>
	import { defineComponent } from '@vue/runtime-core'

	export default defineComponent({})
</script>

<style lang="scss" scoped>
	.header-user-nav {
		display: flex;
		align-items: center;
		height: 100%;
		& > * {
			flex-shrink: 0;
			cursor: default;
		}
	}
	.user-name {
		margin-left: 10px;
		font-weight: 500;
		font-size: 16px;
	}
</style>
