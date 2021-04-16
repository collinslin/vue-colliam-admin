<template>
	<exception-page type="401" />
</template>

<script lang="ts">
	import { defineComponent } from '@vue/runtime-core'
	import ExceptionPage from '/@/components/exception/ExceptionPage.vue'
	export default defineComponent({
		name: 'Exp401',
		components: { ExceptionPage },
	})
</script>

<style scoped lang="less"></style>
