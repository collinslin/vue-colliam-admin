import { createStore } from 'vuex'
import account from './modules/account'
import setting from './modules/setting'

export default createStore({
	state() {
		return {
			count: 1,
		}
	},
	modules: {
		account,
		setting,
	},
	devtools: true,
})
