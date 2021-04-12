<template>
	<iframe :src="src" frameborder="0"></iframe>
</template>

<script>
	import { computed, defineComponent } from '@vue/runtime-core'
	import { useRoute } from 'vue-router'

	export default defineComponent({
		name: 'Iframe',
		setup() {
			const route = useRoute()
			const src = computed(() => route.meta.link)

			return {
				src,
			}
		},
	})
</script>

<style lang="scss">
	iframe {
		width: 100%;
		height: calc(100vh - 100px);
	}
</style>
