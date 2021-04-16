import { RouteRecordRaw } from 'vue-router'
import { AppBeforeEachRoute } from '../type/router/guards'
import { Authority, Permissions, Roles } from '/@/type/store/account'

/**判断是否拥有操作权限
 * @param authority 路由权限配置
 * @param permissions 用户权限集合
 */
export function hasPermission(
	authority: string | Authority,
	permissions: Permissions[] | string[]
) {
	let required = '*'
	if (typeof authority === 'string') {
		required = authority
	} else if (typeof authority === 'object') {
		required = authority.permission as string
	}
	return (
		required === '*' ||
		(permissions &&
			permissions.findIndex(
				(item: any) => item === required || item.id === required
			) !== -1)
	)
}

/**判断是否拥有角色访问权限
 * @param authority 路由权限配置
 * @param roles 用户角色集合
 */
export function hasRole(
	authority: string | Authority,
	roles: Roles[] | string[]
) {
	let required: string[] | string | undefined = undefined
	if (typeof authority === 'object') {
		required = authority.role as string[]
	}
	return authority === '*' || (required && hasAnyRole(required, roles))
}

/**
 * 判断是否有需要的任意一个角色
 * @param required {String | Array[String]} 需要的角色，可以是单个角色或者一个角色数组
 * @param roles 拥有的角色
 * @returns {boolean}
 */
function hasAnyRole(required: string | string[], roles: Roles[] | string[]) {
	if (!required) {
		return false
	} else if (Array.isArray(required)) {
		return (
			roles.findIndex((role: any) => {
				return (
					required.findIndex((item) => item === role || item === role.id) !== -1
				)
			}) !== -1
		)
	} else {
		return (
			roles.findIndex(
				(role: any) => role === required || role.id === required
			) !== -1
		)
	}
}

/**判断目前用户是否有该菜单访问的权限 */
export function hasAuthority(
	route: RouteRecordRaw | AppBeforeEachRoute,
	permissions: Permissions[] | string[],
	roles: Roles[] | string[]
) {
	if (route.meta && Object.keys(route.meta).length > 0) {
		const authorities: Array<Authority | string> = [
			...(route.meta.pAuthorities as Array<Authority | string>),
			route.meta.authority as Authority | string,
		]
		for (let authority of authorities) {
			if (
				!hasPermission(authority, permissions) &&
				!hasRole(authority, roles)
			) {
				return false
			}
		}
		return true
	}
}

/**根据权限过滤菜单 */
export function filterMenu(
	menuData: RouteRecordRaw[],
	permissions: string[] | Permissions[],
	roles: string[] | Roles[]
) {
	return menuData.filter((menu) => {
		if (menu.meta && menu.meta.invisible === undefined) {
			if (!hasAuthority(menu, permissions, roles)) {
				return false
			}
		}
		if (menu.children && menu.children.length > 0) {
			menu.children = filterMenu(menu.children, permissions, roles)
		}
		return true
	})
}

export default {
	filterMenu,
	hasAuthority,
	hasPermission,
	hasRole,
}
