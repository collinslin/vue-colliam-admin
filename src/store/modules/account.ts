import { Module } from 'vuex'
import { Index } from '/@/type/store'
import { Account } from '/@/type/store/account'

const account: Module<Account, Index> = {
	namespaced: true,
	state() {
		return {
			roles: [],
			permissions: [],
		}
	},

	getters: {
		userRoles(state) {
			try {
				const roles = localStorage.getItem(import.meta.env.VITE_APP_ROLES)
				state.roles = roles && JSON.parse(roles)
			} catch (error) {
				console.warn(error)
			}
			return state.roles
		},
		userPermissions(state) {
			try {
				const permissions = localStorage.getItem(import.meta.env.VITE_APP_ROLES)
				state.roles = permissions && JSON.parse(permissions)
			} catch (error) {
				console.warn(error)
			}
			return state.permissions
		},
	},

	mutations: {
		setUserData(state, userData) {
			state.roles = userData.roles
			state.permissions = userData.permissions
			localStorage.setItem(
				import.meta.env.VITE_APP_ROLES,
				JSON.stringify(state.roles)
			)
			localStorage.setItem(
				import.meta.env.VITE_APP_PERMISSIONS,
				JSON.stringify(state.permissions)
			)
		},
	},
}

export default account
