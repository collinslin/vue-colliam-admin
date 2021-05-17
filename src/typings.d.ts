import 'vue-router'
import { Authority } from './type/store/account'

declare module 'vue-router' {
	interface RouteMeta {
		icon?: string
		page?: any
		link?: string
		authority?: Authority
		invisible?: boolean
		isAppView?: boolean
		keepAlive?: boolean
		isCloseTabbar?: boolean
	}
}
