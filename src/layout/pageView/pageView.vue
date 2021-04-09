<template>
	<router-view v-slot="{ Component }">
		<transition name="first">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script>
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'PageView',
	})
</script>

<style lang="scss" scoped>
	//过度动画
	.first-enter-active,
	.first-leave-active {
		position: absolute;
		top: 0;
		left: 0;
		transition: all 0.5s ease;
	}
	.first-enter-from,
	.first-leave-to {
		transform: translateX(100%);
		opacity: 0;
	}
</style>
