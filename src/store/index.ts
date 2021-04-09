import { createStore } from 'vuex'
import account from './modules/account'
import setting from './modules/setting'
import routerStore from './modules/routerStore'

export default createStore({
	state() {
		return {
			count: 1,
		}
	},
	modules: {
		account,
		setting,
		routerStore,
	},
	devtools: true,
})
