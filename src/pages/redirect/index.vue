<template></template>
<script lang="ts">
	import { defineComponent,h } from '@vue/runtime-core'
	import { Store, useStore } from 'vuex'
	import { RouteRecordNormalized, useRoute, useRouter } from 'vue-router'
	import { Index } from '/@/type/store'

	export default defineComponent({
		name: 'Redirect',
		setup() {
			const store = useStore() as Store<Index>
			const route = useRoute()
			const router = useRouter()
			const { params, query } = route
			const { path } = params
			const routerList = router.getRoutes()
			const target = routerList.find(
				(item) => item.path == '/' + path
			) as RouteRecordNormalized
			if (target.meta.keepAlive && target.name) {
				store.state.routerStore?.keepAliveInclude.push(target.name)
			}
			router.replace({ path: '/' + path, query })
		},
	})
</script>
