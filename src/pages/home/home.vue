<template>
	<div>
		<h1>i am home page</h1>
		<el-button v-auth:role="'visitor'">click</el-button>
		<el-input v-auth:role="'visitor'"></el-input>
		<el-checkbox v-auth:role="'visitor'">666</el-checkbox>
		<el-radio v-auth:role="'visitor'">222</el-radio>
	</div>
</template>
<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'home',
		setup() {
			return {}
		},
	})
</script>
