<template>
	<div
		class="dropdown-menu"
		:style="{ transform: `translateX(${left}px) translateY(70px)` }"
	>
		<div
			class="dropdown-item"
			v-for="item in dropdownMenu"
			:key="item.name"
			@click="chooseTabbarMenu(item.type)"
		>
			<el-icon :class="item.icon"></el-icon>
			{{ item.name }}
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, reactive } from '@vue/runtime-core'

	export default defineComponent({
		name: 'TabbarMenu',
		props: {
			left: {
				type: Number,
				required: true,
			},
		},
		setup(props, { emit }) {
			const dropdownMenu = reactive([
				{
					icon: 'el-icon-refresh',
					name: '刷新本页',
					type: 'refresh',
				},
				{
					icon: 'el-icon-delete',
					name: '关闭本页',
					type: 'myDelete',
				},
				{
					icon: 'el-icon-upload2 rotate-left',
					name: '关闭左侧',
					type: 'deleteLeft',
				},
				{
					icon: 'el-icon-upload2 rotate-right',
					name: '关闭右侧',
					type: 'deleteRight',
				},
				{
					icon: 'el-icon-close',
					name: '关闭其他',
					type: 'deleteAll',
				},
			])

			const chooseTabbarMenu = (type: string) => {
				emit('choose-tabbar-menu', type)
				// typeList[type] && typeList[type]()
			}

			return {
				dropdownMenu,
				chooseTabbarMenu,
			}
		},
	})
</script>

<style lang="scss" scoped>
	.rotate-left {
		transform: rotate(-90deg);
	}
	.rotate-right {
		transform: rotate(90deg);
	}
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
		.dropdown-item {
			padding: 10px 0;
			margin: 5px 0;
			font-size: 14px;
			background-color: #fff;
			transition: all 0.3s;
			cursor: pointer;
			&:hover {
				background-color: rgba(217, 236, 255, 0.8);
				color: #409eff;
				border-radius: 10px;
				transform: scale(1.1);
			}
		}
	}
</style>
