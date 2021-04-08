import { App } from '@vue/runtime-core'
import { Router } from 'vue-router'
import { Store } from 'vuex'
import { loadRoutes, setAppOptions } from './utils/routerUtils'
import directiveList from '/@/utils/directive'

export interface RunTimeOptions {
	router?: Router
	store?: Store<any>
	message?: () => {}
}

function runTime(
	{ router, store, message }: RunTimeOptions,
	app: App<Element>
) {
	// 设置应用配置
	setAppOptions({ router, store })
	// 加载 axios 拦截器
	// loadInterceptors(interceptors, { router, store, message })
	// 加载路由
	loadRoutes()
	// 加载路由守卫
	// loadGuards(guards, { router, store, message })
	//加载自定义指令
	directiveList.forEach((directive) => {
		app.directive(directive.name, directive.option)
	})
}

export default runTime
