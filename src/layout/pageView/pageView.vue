<template>
	<router-view v-slot="{ Component }">
		<keep-alive>
			<component :is="Component" />
		</keep-alive>
	</router-view>
</template>

<script>
	import { defineComponent } from '@vue/runtime-core'

	export default defineComponent({
		name: 'PageView',
	})
</script>

<style lang="scss" scoped></style>
