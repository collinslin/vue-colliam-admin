import { App } from '@vue/runtime-core'
import { Router } from 'vue-router'
import guards from '/@/router/guards'
import { Store } from 'vuex'
import { loadRoutes, setAppOptions, loadGuards } from './utils/routerUtils'
import { Index } from './type/store'

export interface RunTimeOptions {
	router?: Router
	store?: Store<Index>
	message?: any
}

function runTime(
	{ router, store, message }: RunTimeOptions,
	app: App<Element>
) {
	// 设置应用配置
	setAppOptions({ router, store, message })
	// 加载 axios 拦截器
	// loadInterceptors(interceptors, { router, store, message })
	// 加载路由
	loadRoutes()
	// 加载路由守卫
	loadGuards(guards, { router, store, message })
}

export default runTime
