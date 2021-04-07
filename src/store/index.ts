import { createStore } from 'vuex'
import account from './modules/account';

export default createStore({
	state() {
		return {
			count: 1,
		}
	},
	modules: {
		account
	},
	devtools: true,
})
