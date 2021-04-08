import { RouteRecordRaw } from 'vue-router'

export interface Setting {
	menuData: RouteRecordRaw[]
	[key: string]: any
}
