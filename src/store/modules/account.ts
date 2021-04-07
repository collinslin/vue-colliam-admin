import { Module } from 'vuex';
import { RouteRecordRaw } from 'vue-router';
import { Account } from '/@/type/store/account';

const account: Module<Account, any> = {
  namespaced: true,
  state() {
    return {
      routesConfig: null
    }
  },

  getters: {
    routesConfig(state) {
      try {
        const routesConfig = localStorage.getItem('admin.routes')
        state.routesConfig = JSON.parse(routesConfig as string)
        state.routesConfig = state.routesConfig ? state.routesConfig : []
      } catch (e) {
        console.error(e.message)
      }
    }
  },

  mutations: {
    setRoutesConfig(state, routesConfig: RouteRecordRaw[]) {
      state.routesConfig = routesConfig
      localStorage.setItem('admin.routes', JSON.stringify(routesConfig))
    }
  }
}

export default account