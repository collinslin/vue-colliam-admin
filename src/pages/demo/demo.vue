<template>
	<h1>{{ this.$route.path }}</h1>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/runtime-core'

	export default defineComponent({
		name: 'Demo',
	})
</script>

<style lang="scss" scoped></style>
