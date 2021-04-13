import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export interface Setting {
	menuData: RouteRecordRaw[]
	tabbarData: RouteLocationNormalized[]
	[key: string]: any
}
