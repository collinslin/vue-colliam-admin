import deepMerge from 'deepmerge'
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { RunTimeOptions } from '../runTime'
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
					(vueRouter && vueRouter?.authority) ||
					routeCfg.meta?.authority ||
					(vueRouter && vueRouter.meta?.authority) ||
					'*',
				icon:
					routeCfg.icon ||
					(vueRouter && vueRouter.icon) ||
					routeCfg.meta?.icon ||
					(vueRouter && vueRouter.meta?.icon),
				page:
					routeCfg.page ||
					(vueRouter && vueRouter.page) ||
					routeCfg.meta?.page ||
					(vueRouter && vueRouter.meta?.page),
				link:
					routeCfg.link ||
					(vueRouter && vueRouter.link) ||
					routeCfg.meta?.link ||
					(vueRouter && vueRouter.meta?.link),
				invisible:
					routeCfg.invisible ||
					(vueRouter && vueRouter.invisible) ||
					routeCfg.meta?.invisible ||
					(vueRouter && vueRouter.meta?.invisible),
				isAppView: routeCfg.isAppView,
			},
		}
		if (routeCfg.children && routeCfg.children.length > 0) {
			asyncRouter.children = parseRoutes(vueRoutes, routeCfg.children)
		}
		console.log(asyncRouter)

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
	if (menuRoutes) {
		store?.commit('setting/setMenuData', menuRoutes)
	}
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

export default {
	loadRoutes,
	formatAuthority,
}
