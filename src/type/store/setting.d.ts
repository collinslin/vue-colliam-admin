import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export interface Setting {
	menuData: RouteRecordRaw[] & { active?: boolean }
	tabbarData: tabbarData[]
	[key: string]: any
}

export interface tabbarData extends RouteLocationNormalized {
	active?: boolean
}
