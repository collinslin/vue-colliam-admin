import { Module } from 'vuex'
import { Setting } from '/@/type/store/setting'
import deepClone from 'lodash/cloneDeep'
import { filterMenu } from '/@/utils/authority-utils'

const account: Module<Setting, any> = {
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
			// if (state.filterMenu) {
			const { permissions, roles } = rootState.account
			return filterMenu(deepClone(state.menuData), permissions, roles)
			// }
			// return state.menuData
		},
	},

	mutations: {
		setMenuData(state, menuData) {
			state.menuData = menuData
		},
	},
}

export default account
