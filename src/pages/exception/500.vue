<template>
	<exception-page type="500" />
</template>

<script lang="ts">
	import { defineComponent } from '@vue/runtime-core'
	import ExceptionPage from '/@/components/exception/ExceptionPage.vue'
	export default defineComponent({
		name: 'Exp500',
		components: { ExceptionPage },
	})
</script>

<style scoped lang="less"></style>
