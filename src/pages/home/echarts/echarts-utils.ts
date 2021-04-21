import debounce from 'lodash/debounce'
import * as echarts from 'echarts/core'

export const addEChartsEventLister = (myChart: echarts.ECharts) => {
	const menuDom = document.getElementById('menu-nav')
	menuDom?.addEventListener(
		'transitionend',
		(e) => {
			if (e.propertyName === 'width') {
				myChart.resize()
			}
		},
		false
	)
	window.addEventListener(
		'resize',
		debounce(() => {
			myChart.resize()
		}, 300)
	)
}
