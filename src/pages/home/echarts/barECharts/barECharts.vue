<template>
	<div
		:ref="(el) => (el ? (chartDom = el) : (chartDom = null))"
		class="chart-wrapper"
		id="bar-echarts"
	></div>
</template>

<script lang="ts">
	import {
		defineComponent,
		onMounted,
		reactive,
		ref,
		Ref,
	} from '@vue/runtime-core'
	import * as echarts from 'echarts/core'
	import { TooltipComponent, GridComponent } from 'echarts/components'
	import { BarChart } from 'echarts/charts'
	import { SVGRenderer } from 'echarts/renderers'
	import { addEChartsEventLister } from '../echarts-utils'
	export default defineComponent({
		anme: 'BarEcharts',
		setup() {
			echarts.use([TooltipComponent, GridComponent, BarChart, SVGRenderer])
			const chartDom: Ref<HTMLElement | null> = ref(null)
			const option = reactive({
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
					},
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
						axisTick: {
							alignWithLabel: true,
						},
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: [
					{
						name: '直接访问',
						type: 'bar',
						barWidth: '60%',
						data: [10, 52, 200, 334, 390, 330, 220],
					},
				],
			})
			onMounted(() => {
				const myChart = echarts.init(chartDom.value!)
				myChart.setOption(option)
				addEChartsEventLister(myChart)
			})
			return {
				chartDom,
			}
		},
	})
</script>
