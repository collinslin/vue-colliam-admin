import { Module } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { StoreRouter } from '/@/type/store/router'
import { Index } from '/@/type/store'

const routerStore: Module<StoreRouter, Index> = {
	namespaced: true,
	state() {
		return {
			routesConfig: null,
			keepAliveInclude: [],
		}
	},

	getters: {
		routesConfig(state) {
			try {
				const routesConfig = localStorage.getItem(
					import.meta.env.VITE_APP_ROUTER as string
				)
				state.routesConfig = JSON.parse(routesConfig as string)
				state.routesConfig = state.routesConfig ? state.routesConfig : []
			} catch (e) {
				console.error(e.message)
			}
		},
	},

	mutations: {
		setRoutesConfig(state, routesConfig: RouteRecordRaw[]) {
			state.routesConfig = routesConfig
			localStorage.setItem(
				import.meta.env.VITE_APP_ROUTER as string,
				JSON.stringify(routesConfig)
			)
		},
		setKeepAliveInclude(state, target: string[]) {
			state.keepAliveInclude = target
		},
	},
}

export default routerStore
