import { createStore } from 'vuex'
import test from './test'

export default createStore({
	state() {
		return {
			count: 1,
		}
	},
	modules: {
		test,
	},
	devtools: true,
})
