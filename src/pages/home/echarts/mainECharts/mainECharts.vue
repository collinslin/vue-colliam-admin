<template>
	<div
		:ref="(el) => (el ? (chartDom = el) : (chartDom = null))"
		id="main-echarts"
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
	import {
		TitleComponent,
		ToolboxComponent,
		TooltipComponent,
		GridComponent,
		LegendComponent,
	} from 'echarts/components'
	import { LineChart } from 'echarts/charts'
	import { SVGRenderer } from 'echarts/renderers'
	import { addEChartsEventLister } from '../echarts-utils'
	export default defineComponent({
		name: 'MainECharts',
		setup() {
			echarts.use([
				TitleComponent,
				ToolboxComponent,
				TooltipComponent,
				GridComponent,
				LegendComponent,
				LineChart,
				SVGRenderer,
			])
			const chartDom: Ref<HTMLElement | null> = ref(null)
			const echartsData = reactive([
				{
					name: '邮件营销',
					type: 'line',
					smooth: true,
					stack: '总量',
					areaStyle: {},
					emphasis: {
						focus: 'series',
					},
					data: [120, 132, 101, 134, 90, 230, 210],
					animationDuration: 2000,
				},
				{
					name: '联盟广告',
					type: 'line',
					smooth: true,
					stack: '总量',
					areaStyle: {},
					emphasis: {
						focus: 'series',
					},
					data: [220, 182, 191, 234, 290, 330, 310],
					animationDuration: 2000,
				},
			])
			const option = reactive({
				title: {
					text: '',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
				},
				legend: {
					data: ['邮件营销', '联盟广告'],
				},
				toolbox: {
					feature: {
						saveAsImage: { title: '保存' },
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
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: echartsData,
				animationDuration: 2000,
			})
			onMounted(() => {
				if (chartDom.value) {
					const myChart = echarts.init(chartDom.value)
					myChart.setOption(option)
					addEChartsEventLister(myChart)
				}
			})

			return { chartDom }
		},
	})
</script>
