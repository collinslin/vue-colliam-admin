<template>
	<router-view></router-view>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'App',
	})
</script>

<style>
	body {
		margin: 0;
	}

	#app {
		width: 100vw;
		height: 100vh;
		color: #2c3e50;
		background-color: #f2f6fc;
	}
</style>
