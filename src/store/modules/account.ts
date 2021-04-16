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
			return state.roles
		},
		userPermissions(state) {
			return state.permissions
		},
	},

	mutations: {
		setUserData(state, userData) {
			state.roles = userData.roles
			state.permissions = userData.permissions
			localStorage.setItem(
				import.meta.env.VITE_APP_ROLES as string,
				JSON.stringify(state.roles)
			)
			localStorage.setItem(
				import.meta.env.VITE_APP_PERMISSIONS as string,
				JSON.stringify(state.permissions)
			)
		},
	},
}

export default account
