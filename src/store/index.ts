import { createStore } from 'vuex'
import account from './modules/account'
import setting from './modules/setting'
import routerStore from './modules/routerStore'
import { Index } from '../type/store'

export default createStore<Index>({
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
