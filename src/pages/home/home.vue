<template>
	<div class="home-nav">
		<LineChart></LineChart>
		<MainECharts></MainECharts>
		<el-row :gutter="32">
			<el-col :xs="24" :sm="24" :lg="8">
				<SunburstECharts></SunburstECharts>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="8">
				<PieECharts></PieECharts>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="8">
				<BarECharts></BarECharts>
			</el-col>
		</el-row>
	</div>
</template>
<script lang="ts">
	import { defineComponent } from 'vue'
	import LineChart from './echarts/lineCharts/lineCharts.vue'
	import MainECharts from './echarts/mainECharts/mainECharts.vue'
	import BarECharts from './echarts/barECharts/barECharts.vue'
	import PieECharts from './echarts/pieECharts/pieECharts.vue'
	import SunburstECharts from './echarts/sunburstECharts/sunburstECharts.vue'

	export default defineComponent({
		name: 'home',
		components: {
			LineChart,
			MainECharts,
			SunburstECharts,
			PieECharts,
			BarECharts,
		},
		setup() {
			return {}
		},
	})
</script>

<style lang="scss" scoped>
	.home-count-to {
		font-size: 32px;
		font-weight: bold;
		color: rgba(231, 94, 94, 0.856);
	}
	.home-nav {
		width: 100%;
		background-color: #f0f2f5;
		overflow: hidden;
	}
	#main-echarts {
		width: 100%;
		height: 300px;
		margin-bottom: 32px;
		background-color: #fff;
	}
	.chart-wrapper {
		height: 300px;
		padding: 16px 16px 0;
		margin-bottom: 32px;
		background-color: #fff;
	}

	@media (max-width: 1024px) {
		.chart-wrapper {
			padding: 8px;
		}
	}
</style>

<style lang="scss" scoped></style>
