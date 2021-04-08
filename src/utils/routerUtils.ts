import deepMerge from 'deepmerge'
import { RouteRecordRaw } from 'vue-router'
import { RunTimeOptions } from '../runTime'
import { Authority } from '../type/store/account'

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

/**加载路由
 * @param routesConfig {RouteRecordRaw[]} 路由配置
 */
export function loadRoutes(routesConfig?: RouteRecordRaw[]) {
	const { router, store } = appOptions
	const routes = router?.options.routes as RouteRecordRaw[]
	if (routesConfig) {
		store?.commit('account/setRoutesConfig', routesConfig)
	} else {
		routesConfig = store?.getters['account/routesConfig']
	}
	if (routesConfig && routesConfig.length > 0) {
		const finalRoutes = deepMergeRoutes(routes, routesConfig)
		formatAuthority(finalRoutes)
		console.log(finalRoutes)

		finalRoutes?.forEach((item) => {
			router?.addRoute(item)
		})
	}

	const routesList = router?.getRoutes()
	const rootRoute = routesList?.find((item) => item.path === '/')
	const menuRoutes = rootRoute && rootRoute.children
	console.log(menuRoutes)

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
