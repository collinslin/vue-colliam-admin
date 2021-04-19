<template>
	<div>
		<h1>i am home page</h1>
		<el-button v-auth:role="'visitor'">click</el-button>
		<el-input v-auth:role="'visitor'" v-model="inpVal"></el-input>
		<el-checkbox v-auth:role="'visitor'">666</el-checkbox>
		<el-radio v-auth:role="'visitor'">222</el-radio>
	</div>
</template>
<script lang="ts">
	import { defineComponent, ref } from 'vue'

	export default defineComponent({
		name: 'home',
		setup() {
			const inpVal = ref('')
			return { inpVal }
		},
	})
</script>
