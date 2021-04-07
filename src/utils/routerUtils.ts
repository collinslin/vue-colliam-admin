import deepMerge from 'deepmerge'
import { RouteRecordRaw } from 'vue-router'

export function loadRoutes() {}

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

/**合并路由 */
export function deepMergeRoutes(
	target: RouteRecordRaw[],
	source: RouteRecordRaw[]
) {
	const tarMap = mapRoutes(target)
	const srcMap = mapRoutes(source)
	// 合并路由
	const merge: [] = deepMerge(tarMap, srcMap)
	return parseRoutesMap(merge)
}
