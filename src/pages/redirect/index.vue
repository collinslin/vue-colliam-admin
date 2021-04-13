<script lang="ts">
	import { defineComponent, h } from '@vue/runtime-core'
	import { useRoute, useRouter } from 'vue-router'

	export default defineComponent({
		name: 'Redirect',
		setup() {
			const route = useRoute()
			const router = useRouter()
			const { params, query } = route
			const { path } = params
			router.replace({ path: '/' + path, query })
			return h('')
		},
	})
</script>
