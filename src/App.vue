<template>
	<router-view></router-view>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'App',
		setup() {
			return {}
		},
	})
</script>

<style lang="scss">
	body {
		margin: 0;
	}

	#app {
		width: 100vw;
		height: 100vh;
		background-color: #f2f6fc;
		color: #2c3e50;
		overflow: hidden;
	}
	ul {
		padding: 0;
		margin: 0;
	}
	li {
		list-style: none;
	}
</style>
