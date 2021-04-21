<template>
	<div
		:ref="(el) => (el ? (chartDom = el) : (chartDom = null))"
		class="chart-wrapper"
		id="pie-echarts"
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
		TooltipComponent,
		LegendComponent,
	} from 'echarts/components'
	import { PieChart } from 'echarts/charts'
	import { SVGRenderer } from 'echarts/renderers'
	import { addEChartsEventLister } from '../echarts-utils'
	export default defineComponent({
		name: 'PieECharts',
		setup() {
			echarts.use([
				TitleComponent,
				TooltipComponent,
				LegendComponent,
				PieChart,
				SVGRenderer,
			])
			const chartDom: Ref<HTMLElement | null> = ref(null)
			const option = reactive({
				title: {
					text: '某站点用户访问来源',
					subtext: '纯属虚构',
					left: 'center',
				},
				tooltip: {
					trigger: 'item',
				},
				legend: {
					orient: 'vertical',
					left: 'left',
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '50%',
						center: ['55%', '55%'],
						data: [
							{ value: 1048, name: '搜索引擎' },
							{ value: 735, name: '直接访问' },
							{ value: 580, name: '邮件营销' },
							{ value: 484, name: '联盟广告' },
							{ value: 300, name: '视频广告' },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
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
