import { RouteRecordRaw } from 'vue-router'

export interface StoreRouter {
	routesConfig?: null | RouteRecordRaw[]
	[key: string]: any
}

export interface RoutesConfig {
	path?: string
	name?: string
	router: string
	icon?: string
	page?: any
	link?: string
	authority?: string
	invisible?: boolean
	isAppView?: boolean
	meta?: {
		icon?: string
		page?: any
		link?: string
		authority?: string
		invisible?: boolean
		isAppView?: boolean
	}
	children?: RoutesConfig[]
}
