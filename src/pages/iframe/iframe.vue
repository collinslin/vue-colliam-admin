<template>
	<iframe :src="src" frameborder="0" style="width: 100%; height: 100%"></iframe>
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
		html,
		body {
			width: 100%;
			height: 100%;
		}
	}
</style>
