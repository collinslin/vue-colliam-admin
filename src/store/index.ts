import { createStore } from 'vuex'
import router from './modules/router';
import account from './modules/account'
import setting from './modules/setting'

export default createStore({
	state() {
		return {
			count: 1,
		}
	},
	modules: {
		router,
		account,
		setting,
	},
	devtools: true,
})
