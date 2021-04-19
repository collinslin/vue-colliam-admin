import { App, DirectiveBinding } from '@vue/runtime-core'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { Permissions, Roles } from '/@/type/store/account'
import { checkType } from '/@/utils/utils'
//权限指令
/** 获取路由需要的权限*/
interface MetaAuthority {
	permission?: string
	role?: string[]
}
const getRoutePermission = (
	permissions: Permissions[],
	route: RouteLocationNormalizedLoaded
) => {
	return permissions.find((item) => {
		const authority = route.meta.authority as MetaAuthority
		return item.id === authority.permission
	})
}

/**获取路由需要的角色 */
const getRouteRole = (roles: Roles[], route: RouteLocationNormalizedLoaded) => {
	const authority = route.meta.authority as MetaAuthority
	const requiredRoles = authority.role
	return requiredRoles
		? roles.filter(
				(item) =>
					requiredRoles.findIndex((required) => required === item.id) !== -1
		  )
		: []
}

/**操作权限校验 */
const auth = function (
	this: any,
	authConfig: { check: any; type: string },
	permission: Permissions,
	role: Roles[],
	permissions: Permissions[],
	roles: Roles[]
) {
	const { check, type } = authConfig
	if (check && typeof check === 'function') {
		return check.apply(this, [permission, role, permissions, roles])
	}
	if (type === 'permission') {
		return checkFromPermission(check, permissions)
	} else if (type === 'role') {
		return checkFromRoles(check, roles)
	} else {
		return (
			checkFromPermission(check, permissions) || checkFromRoles(check, roles)
		)
	}
}

/**检查权限是否有操作权限 */
const checkFromPermission = function (check: any, permission: Permissions) {
	return (
		permission &&
		permission.operation &&
		permission.operation.indexOf(check) !== -1
	)
}

/**检查 roles 是否有操作权限 */
const checkFromRoles = function (check: any, roles: Roles[]) {
	if (!roles) {
		return false
	}
	for (let role of roles) {
		if (typeof role === 'string') {
			return role === check
		} else {
			const { operation } = role
			if (operation && operation.indexOf(check) !== -1) {
				return true
			}
		}
	}
	return false
}

/**检验是否有权限使用dom元素 */
const checkInject = (el: any, binding: DirectiveBinding) => {
	const type = binding.arg
	const check = binding.value
	const _this = binding.instance as any
	const $auth = _this.$auth
	if (!$auth || !$auth(check, type!)) {
		addDisabled(el)
	} else {
		removeDisabled(el)
	}
}

/**添加指令样式 */
const addDisabled = function (el: any) {
	el.disabled = true
	el.classList.add('is-disabled')
	const hasChildren = el.children
	if (hasChildren) {
		const childrenList = [...hasChildren]
		childrenList.forEach((children) => {
			addDisabled(children)
		})
	}
	el.setAttribute('title', '无此权限')
}

/**移除指令样式 */
const removeDisabled = function (el: any) {
	el.disabled = false
	el.classList.remove('disabled')
	el.removeAttribute('title')
}

const AuthorityPlugin = {
	install(app: App<Element>) {
		app.directive('auth', {
			// v-auth:arg="value"
			beforeMount(el, binding) {
				setTimeout(() => checkInject(el, binding), 10)
			},
			updated(el, binding) {
				setTimeout(() => checkInject(el, binding), 10)
			},
			unmounted(el) {
				removeDisabled(el)
			},
		})
		app.mixin({
			beforeCreate() {},
			methods: {
				$auth(check: any, type: string) {
					const permissions = this.$store.getters['account/userPermissions'] //权限集合
					const roles = this.$store.getters['account/userRoles'] //角色集合
					const permission = getRoutePermission(permissions, this.$route) //当前页面需要权限
					const role = getRouteRole(roles, this.$route) //当前页面需要的角色
					return auth.apply(this, [
						{ check, type },
						permission!,
						role,
						permissions,
						roles,
					])
				},
			},
		})

		const $auth = app._context.mixins.find((item) => item.methods.$auth)
			?.methods.$auth
		app.provide('$auth', $auth)
	},
}

export default AuthorityPlugin
