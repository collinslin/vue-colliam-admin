<template>
	<exception-page type="404" />
</template>

<script lang="ts">
	import { defineComponent } from '@vue/runtime-core'
	import ExceptionPage from '/@/components/exception/ExceptionPage.vue'
	export default defineComponent({
		name: 'Exp404',
		components: { ExceptionPage },
	})
</script>

<style scoped lang="less"></style>
