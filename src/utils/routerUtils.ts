import deepMerge from 'deepmerge'
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { Store } from 'vuex'
import { RunTimeOptions } from '../runTime'
import { RouterGuards } from '../type/router/guards'
import { Index } from '../type/store'
import { Authority } from '/@/type/store/account'
import { RoutesConfig } from '/@/type/store/router'

//应用配置
let appOptions: RunTimeOptions = {
	router: undefined,
	store: undefined,
}

/**初始化应用配置 */
export function setAppOptions(options: RunTimeOptions) {
	const { router, store } = options
	appOptions.router = router
	appOptions.store = store
}

/**初始化路由表 */
function parseRoutes(
	vueRoutes: RouteRecordNormalized[],
	routesConfig: RoutesConfig[]
) {
	let asyncRouterMap: RouteRecordRaw[] = []
	routesConfig.forEach((item: RoutesConfig | string) => {
		let vueRouter: any = undefined,
			routeCfg = {} as RoutesConfig
		if (typeof item == 'string') {
			vueRouter = vueRoutes.find((vueRoutesItem) => vueRoutesItem.name == item)
			routeCfg = { path: vueRouter?.name as string, router: item }
		} else {
			vueRouter = vueRoutes.find(
				(vueRoutesItem) => vueRoutesItem.name == item.router
			)
			routeCfg = item
		}
		const asyncRouter: RouteRecordRaw = {
			path:
				(routeCfg.isAppView ? routeCfg.path : routeCfg.link) ||
				(vueRouter?.name == 'root' ? '/' : vueRouter?.name) ||
				routeCfg.router,
			name:
				(routeCfg.isAppView ? `${routeCfg?.name}AppView` : routeCfg?.name) ||
				vueRouter?.name,
			components: routeCfg.isAppView
				? { default: () => import('/@/pages/iframe') }
				: (vueRouter?.components as any),
			meta: {
				title: routeCfg.name || vueRouter.meta.title,
				authority:
					routeCfg?.authority ||
					routeCfg.meta?.authority ||
					(vueRouter && vueRouter.meta?.authority) ||
					'*',
				icon:
					routeCfg.icon ||
					routeCfg.meta?.icon ||
					(vueRouter && vueRouter.meta?.icon),
				page:
					routeCfg.page ||
					routeCfg.meta?.page ||
					(vueRouter && vueRouter.meta?.page),
				link:
					routeCfg.link ||
					routeCfg.meta?.link ||
					(vueRouter && vueRouter.meta?.link),
				invisible:
					routeCfg.invisible ||
					routeCfg.meta?.invisible ||
					(vueRouter && vueRouter.meta?.invisible),
				isAppView:
					routeCfg.isAppView ||
					(vueRouter && vueRouter.meta.isAppView) ||
					false,
				keepAlive:
					routeCfg.keepAlive ||
					(vueRouter && vueRouter.meta.keepAlive) ||
					false,
				isCloseTabbar:
					vueRouter && vueRouter.meta.isCloseTabbar
						? vueRouter.meta.isCloseTabbar
						: true,
			},
		}
		if (routeCfg.children && routeCfg.children.length > 0) {
			asyncRouter.children = parseRoutes(vueRoutes, routeCfg.children)
		}
		asyncRouterMap.push(asyncRouter)
	})
	return asyncRouterMap
}

/**加载路由
 * @param routesConfig {any[]} 路由配置
 */
export function loadRoutes(routesConfig?: RoutesConfig[]) {
	const { router, store } = appOptions
	const vueRoutes = router?.getRoutes() as RouteRecordNormalized[]
	if (routesConfig) {
		store?.commit('routerStore/setRoutesConfig', routesConfig)
	} else {
		routesConfig = store?.getters['routerStore/routesConfig']
	}
	if (routesConfig && routesConfig.length > 0) {
		const asyncRouters = parseRoutes(vueRoutes, routesConfig)
		const finalRoutes = deepMergeRoutes(vueRoutes, asyncRouters)
		formatAuthority(finalRoutes)
		finalRoutes?.forEach((item) => {
			router?.addRoute(item)
		})
	}

	const routesList = router?.getRoutes()
	const rootRoute = routesList?.find((item) => item.path === '/')
	const menuRoutes = rootRoute && rootRoute.children
	initKeepAliveComponents(menuRoutes, store)
	if (menuRoutes) {
		store?.commit('setting/setMenuData', menuRoutes)
	}
}

/**初始化需要持久化的组件 */
function initKeepAliveComponents(
	menuRoutes?: RouteRecordRaw[],
	store?: Store<Index>
) {
	menuRoutes?.forEach((item) => {
		if (item.meta?.keepAlive && item.name) {
			if (!store?.state.routerStore?.keepAliveInclude.includes(item.name)) {
				store?.state.routerStore?.keepAliveInclude.push(item.name)
			}
		}
	})
}

/**合并路由 */
function deepMergeRoutes(
	target: RouteRecordRaw[],
	source: RouteRecordRaw[]
): RouteRecordRaw[] {
	const tarMap = mapRoutes(target)
	const srcMap = mapRoutes(source)
	// 合并路由
	const merge: [] = deepMerge(tarMap, srcMap)
	return parseRoutesMap(merge)
}

/**映射路由数组 */
const mapRoutes = (routes: RouteRecordRaw[]) => {
	const routesMap: any = {}
	routes.forEach((item) => {
		routesMap[item.path] = {
			...item,
			children: item.children ? mapRoutes(item.children) : undefined,
		}
	})
	return routesMap
}

/**转换为 routes 数组 */
const parseRoutesMap = (routesMap: []) => {
	return Object.values(routesMap).map((item: any) => {
		if (item.children) {
			item.children = parseRoutesMap(item.children)
		} else {
			delete item.children
		}
		return item
	})
}

/**初始化路由权限 */
export function formatAuthority(
	routes: RouteRecordRaw[],
	pAuthorities: Authority[] = []
) {
	routes.forEach((route) => {
		const meta = route.meta
		const defaultAuthority = (pAuthorities &&
			pAuthorities[pAuthorities.length - 1]) || {
			permission: '*',
		}
		if (meta) {
			let authority: Authority = {}
			if (!meta.authority) {
				authority = defaultAuthority
			} else if (typeof meta.authority === 'string') {
				authority.permission = meta.authority
			} else if (typeof meta.authority === 'object') {
				authority = meta.authority as Authority
				const { role } = authority
				if (typeof role === 'string') {
					authority.role = [role]
				}
				if (!authority.permission && !authority.role) {
					authority = defaultAuthority
				}
			}
			meta.authority = authority
		} else {
			const authority = defaultAuthority
			route.meta = { authority }
		}
		if (route.meta) {
			route.meta.pAuthorities = pAuthorities
			if (route.children && pAuthorities) {
				formatAuthority(route.children, [
					...pAuthorities,
					route.meta.authority as Authority,
				])
			}
		}
	})
}

/**加载路由守卫
 * @param guards
 * @param options
 */
export function loadGuards(guards: RouterGuards, options: RunTimeOptions) {
	const { beforeEach, afterEach } = guards
	const { router } = options
	beforeEach.forEach((beforeEachGuards) => {
		if (beforeEachGuards && typeof beforeEachGuards === 'function') {
			router?.beforeEach((to, from, next) =>
				beforeEachGuards(to, from, next, options)
			)
		}
	})
	afterEach.forEach((afterEachGuards) => {
		if (afterEachGuards && typeof afterEachGuards === 'function') {
			router?.afterEach((to, from) => afterEachGuards(to, from, options))
		}
	})
}

export default {
	loadRoutes,
	loadGuards,
	formatAuthority,
}
