import { Module } from 'vuex'
import { Account } from '/@/type/store/account'

const account: Module<Account, any> = {
	namespaced: true,
	state() {
		return {
		}
	},
}

export default account

