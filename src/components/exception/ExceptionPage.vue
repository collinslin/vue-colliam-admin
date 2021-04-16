<template>
	<div class="exception-page">
		<div class="img">
			<img :src="config[type].img + '?' + new Date()" />
			<slot></slot>
		</div>
		<div class="content">
			<h1>{{ config[type].title }}</h1>
			<div class="desc">{{ config[type].desc }}</div>
			<div class="action">
				<el-button type="primary" @click="backHome">返回首页</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, reactive } from '@vue/runtime-core'
	import { useRoute, useRouter } from 'vue-router'
	import Config from './typeConfig'
	import { changeMenuStyle } from '/@/utils/utils'

	export default defineComponent({
		name: 'ExceptionPage',
		props: ['type'],
		emits: ['back-home'],
		setup(props, { emit }) {
			const config = reactive(Config)
			const route = useRoute()
			const router = useRouter()
			const backHome = () => {
				changeMenuStyle(route.path)
				router.push('/home')
				emit('back-home', props.type)
			}
			return { config, backHome }
		},
	})
</script>

<style lang="scss" scoped>
	.exception-page {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: calc(100vh - 110px);
	}

	.content {
		margin-left: 30px;
	}
	.desc {
		margin-bottom: 20px;
		font-size: 18px;
		font-weight: 600;
	}
</style>
