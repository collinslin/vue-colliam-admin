<template>
	<div
		:ref="(el) => (el ? (chartDom = el) : (chartDom = null))"
		class="chart-wrapper"
		id="sunburst-echarts"
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
	import { VisualMapComponent } from 'echarts/components'
	import { SunburstChart } from 'echarts/charts'
	import { SVGRenderer } from 'echarts/renderers'
	import { addEChartsEventLister } from '../echarts-utils'
	export default defineComponent({
		name: 'SunburstEcharts',
		setup() {
			echarts.use([VisualMapComponent, SunburstChart, SVGRenderer])
			const chartDom: Ref<HTMLElement | null> = ref(null)

			const echartsData = reactive([
				{
					name: 'Grandpa',
					children: [
						{
							name: 'Uncle Leo',
							value: 15,
							children: [
								{
									name: 'Cousin Jack',
									value: 2,
								},
								{
									name: 'Cousin Mary',
									value: 5,
									children: [
										{
											name: 'Jackson',
											value: 2,
										},
									],
								},
								{
									name: 'Cousin Ben',
									value: 4,
								},
							],
						},
						{
							name: 'Aunt Jane',
							children: [
								{
									name: 'Cousin Kate',
									value: 4,
								},
							],
						},
						{
							name: 'Father',
							value: 10,
							children: [
								{
									name: 'Me',
									value: 5,
									itemStyle: {
										color: 'red',
									},
								},
								{
									name: 'Brother Peter',
									value: 1,
								},
							],
						},
					],
				},
				{
					name: 'Mike',
					children: [
						{
							name: 'Uncle Dan',
							children: [
								{
									name: 'Cousin Lucy',
									value: 3,
								},
								{
									name: 'Cousin Luck',
									value: 4,
									children: [
										{
											name: 'Nephew',
											value: 2,
										},
									],
								},
							],
						},
					],
				},
				{
					name: 'Nancy',
					children: [
						{
							name: 'Uncle Nike',
							children: [
								{
									name: 'Cousin Betty',
									value: 1,
								},
								{
									name: 'Cousin Jenny',
									value: 2,
								},
							],
						},
					],
				},
			])
			const option = reactive({
				visualMap: {
					type: 'continuous',
					min: 0,
					max: 10,
					inRange: {
						color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862'],
					},
				},
				series: {
					type: 'sunburst',
					data: echartsData,
					radius: [0, '90%'],
					label: {
						rotate: 'radial',
					},
				},
			})

			onMounted(() => {
				const myChart = echarts.init(chartDom.value!)
				myChart.setOption(option)
				addEChartsEventLister(myChart)
			})

			return { chartDom }
		},
	})
</script>
