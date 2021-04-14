<template>
	<div
		class="dropdown-menu"
		:style="{ transform: `translateX(${left}px) translateY(70px)` }"
	>
		<Dropdown
			:dropdownMenu="dropdownMenu"
			@click-dropdown-menu="clickDropdownItem"
		></Dropdown>
	</div>
</template>

<script lang="ts">
	import { defineComponent, reactive } from '@vue/runtime-core'
	import Dropdown, { DropdownMenu } from './dropdown.vue'

	export default defineComponent({
		name: 'DropdownNav',
		components: { Dropdown },
		props: {
			left: {
				type: Number,
				required: true,
			},
		},
		emits: ['click-tabbar-menu'],
		setup(props, { emit }) {
			const dropdownMenu: DropdownMenu[] = reactive([
				{
					icon: 'el-icon-refresh',
					name: '刷新本页',
					type: 'refresh',
				},
				{
					icon: 'el-icon-delete',
					name: '关闭本页',
					type: 'close',
				},
				{
					icon: 'el-icon-upload2 rotate-left',
					name: '关闭左侧',
					type: 'closeLeft',
				},
				{
					icon: 'el-icon-upload2 rotate-right',
					name: '关闭右侧',
					type: 'closeRigth',
				},
				{
					icon: 'el-icon-close',
					name: '关闭其他',
					type: 'closeAll',
				},
			])

			const clickDropdownItem = (type: string) => {
				emit('click-tabbar-menu', type)
			}

			return {
				dropdownMenu,
				clickDropdownItem,
			}
		},
	})
</script>

<style lang="scss" scoped>
	.dropdown-menu {
		position: absolute;
		width: 120px;
		top: 35px;
		border: 1px solid rgb(233, 233, 235);
		background-color: #fff;
		text-align: center;
		border-radius: 10px;
		box-shadow: 0px -4px 20px 0px #0000001c;
		transition: all 0.2s;
		z-index: 2;
		&::before {
			content: '';
			position: absolute;
			width: 0;
			height: 0;
			left: 0;
			right: 0;
			margin: auto;
			border: 10px solid rgb(233, 233, 235);
			border-color: transparent transparent #fff transparent;
			transform: translateY(-100%);
			z-index: 3;
		}
	}
</style>
