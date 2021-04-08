import { RouteRecordRaw } from 'vue-router'
export interface Account {
	user?: any
	permissions?: string[] | Permissions[] | null
	roles?: string[] | Roles[] | null
	routesConfig?: null | RouteRecordRaw[]
	[key: string]: any
}

export interface Authority extends Object {
	permission?: string | Permissions[] | string[]
	role?: string | Roles[] | string[]
}

export interface Permissions extends Object {
	id?: string
	operation?: string[]
}

export interface Roles extends Object {
	id?: string
	operation?: string[]
}
