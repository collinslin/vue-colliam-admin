import { Module } from 'vuex'
import { Setting } from '/@/type/store/setting'
import { Index } from '/@/type/store'

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

	getters: {},

	mutations: {
		setMenuData(state, menuData) {
			state.menuData = menuData
		},
	},
}

export default account
