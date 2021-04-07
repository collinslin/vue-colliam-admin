import deepMerge from 'deepmerge'
import { RouteRecordRaw, createRouter } from 'vue-router'
import { RunTimeOptions } from '../runTime';

//应用配置
let appOptions: RunTimeOptions = {
	router: undefined,
	store: undefined
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
	const routes = router?.options.routes as RouteRecordRaw[], newRouter = null as any
	console.log(router);
	if (routesConfig) {
		store?.commit('account/setRoutesConfig', routesConfig)
	} else {
		routesConfig = store?.getters['account/routesConfig']
	}

	if (routesConfig && routesConfig.length > 0) {
		const finalRoutes = deepMergeRoutes(routes, routesConfig)
		console.log(finalRoutes);

		// newRouter.options.routes = { ...router?.options, routes: finalRoutes }
		finalRoutes.forEach((item) => {
			console.log(1);

			router?.addRoute(item)
		})
		console.log(router);

	}

	// const rootRoute = routes.find(item => item.path === '/')
	// const menuRoutes = rootRoute && rootRoute.children
	// if (menuRoutes) {
	// 	store?.commit('setting/setMenuData', menuRoutes)
	// }
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

export default {
	loadRoutes
}
