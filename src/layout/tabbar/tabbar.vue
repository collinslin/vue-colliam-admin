<template>
	<el-tabs
		v-model="tabbarDataValue"
		type="card"
		:closable="true"
		@tab-click="chooseTabbar"
	>
		<el-tab-pane
			v-for="item in tabbarData"
			:key="item.path"
			:label="item.name"
			:name="item.path"
			:closable="true"
		>
		</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts">
	import { computed, defineComponent } from '@vue/runtime-core'
	import { useRoute, useRouter } from 'vue-router'
	import { useStore } from 'vuex'

	export default defineComponent({
		name: 'Tabbar',
		setup() {
			const store = useStore()
			const route = useRoute()
			const router = useRouter()

			const tabbarDataValue = computed({
				get: () => route.path,
				set: () => route.path,
			})

			const tabbarData = computed(() => store.state.setting.tabbarData)

			const chooseTabbar = (tabbar: any) => {
				router.push(tabbar.props.name)
			}

			return { tabbarDataValue, tabbarData, chooseTabbar }
		},
	})
</script>

<style lang="scss" scoped></style>
<style lang="scss" scoped>
	//element-ui
	:deep(.el-tabs__header) {
		margin: 0;
		border: none !important;
	}
	:deep(el-tabs__nav) {
		border: none !important;
	}
</style>
