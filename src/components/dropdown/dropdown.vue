<template>
	<div
		class="dropdown-item"
		v-for="item in dropdownMenu"
		:key="item.name"
		@click="chooseDropdownMenu(item.type)"
	>
		<el-icon :class="item.icon"></el-icon>
		{{ item.name }}
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/runtime-core'

	export interface DropdownMenu {
		icon: string
		name: string
		type: string
	}

	export default defineComponent({
		name: 'DropdownItem',
		props: {
			dropdownMenu: {
				type: Array,
				required: true,
			},
		},
		emits: ['click-dropdown-menu'],
		setup(props, { emit }) {
			const chooseDropdownMenu = (type: string) => {
				emit('click-dropdown-menu', type)
			}
			return { chooseDropdownMenu }
		},
	})
</script>

<style lang="scss" scoped>
	.dropdown-item {
		padding: 10px;
		margin: 5px 0;
		font-size: 14px;
		background-color: #fff;
		transition: all 0.3s;
		cursor: pointer;
		&:hover {
			background-color: rgba(217, 236, 255, 0.8);
			color: #409eff;
			border-radius: 4px;
			transform: scale(1.1);
		}
	}
	.rotate-left {
		transform: rotate(-90deg);
	}
	.rotate-right {
		transform: rotate(90deg);
	}
</style>
