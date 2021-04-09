<template>
	<el-icon
		class="change-collapse-btn"
		:class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
		@click="changeCollapse"
	></el-icon>
</template>

<script>
	import { computed, defineComponent } from '@vue/runtime-core'
	import { useStore } from 'vuex'

	export default defineComponent({
		name: 'Header',
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
			return {
				isCollapse,
				changeCollapse,
			}
		},
	})
</script>

<style lang="scss" scoped>
	.change-collapse-btn {
		border: none;
		padding: 20px;
		font-size: 30px;
		border-radius: 10px;
		transform: translateX(-20px);
		transition: all 0.2s;

		&:hover {
			background-color: #ecf5ff;
		}
	}
</style>
