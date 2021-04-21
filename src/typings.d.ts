import 'vue-router'

declare module 'vue-router' {
	interface RouteMeta {
		icon?: string
		page?: any
		link?: string
		authority?: string
		invisible?: boolean
		isAppView?: boolean
		keepAlive?: boolean
		isCloseTabbar?: boolean
	}
}
