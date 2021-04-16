import { Module } from 'vuex'
import { Setting } from '/@/type/store/setting'
import deepClone from 'lodash/cloneDeep'
import { filterMenu } from '/@/utils/authority-utils'
import { Index } from '/@/type/store'
import { Roles } from '/@/type/store/account'

const account: Module<Setting, Index> = {
	namespaced: true,
	state() {
		return {
			menuData: [],
			tabbarData: [],
			menuWidth: 210,
			isCollapse: false,
		}
	},

	getters: {
		menuData(state, getters, rootState) {
			if (rootState.account) {
				const { permissions, roles } = rootState.account
				return filterMenu(
					deepClone(state.menuData),
					permissions as string[] | Permissions[],
					roles as string[] | Roles[]
				)
			}
		},
	},

	mutations: {
		setMenuData(state, menuData) {
			state.menuData = menuData
		},
	},
}

export default account
