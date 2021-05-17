/**路由守卫 */
import {
	AppBeforeEach,
	AppAfterEach,
	RouterGuards,
} from '../type/router/guards'
import NProgress from 'nprogress'
import { hasAuthority } from '/@/utils/authority-utils'
import { isException } from '../utils/utils'
import { RunTimeOptions } from '../runTime'
import { AppBeforeEachRoute } from '../type/router/guards'

NProgress.configure({ showSpinner: false })

/**加载进度条
 * @param to
 * @param form
 * @param next
 */
const progressStart: AppBeforeEach = (to, from, next) => {
	if (!NProgress.isStarted()) {
		NProgress.start()
	}
	next()
}

/**添加Tabbar */
const addTabbar = (to: AppBeforeEachRoute, options: RunTimeOptions) => {
	if (!to.meta.useTab) {
		return
	}
	const { store } = options
	const tabbarData = store?.state.setting?.tabbarData
	const tabbarFlag = isException(to.path)
	const inTabbar = tabbarData?.find((tabbar) => tabbar.path == to.path)
	if (!inTabbar) {
		if (to.path.includes('home')) {
			store?.commit('setting/setTabbarData', { type: 1, data: to })
		} else if (!tabbarFlag) {
			store?.commit('setting/setTabbarData', { type: 0, data: to })
		}
	}
	tabbarData?.forEach((tabbar) => {
		if (tabbar.path == to.path) {
			tabbar.active = true
		} else {
			tabbar.active = false
		}
	})
}

/**权限验证 */
const authorityVerification: AppBeforeEach = (to, from, next, options) => {
	const { store, message } = options
	const flag = hasAuthority(
		to,
		store?.getters['account/userPermissions'],
		store?.getters['account/userRoles']
	)
	if (flag) {
		addTabbar(to, options)
		next()
	} else {
		message &&
			message({
				message: '您暂时没有权限访问，可以联系管理员开通访问权限',
				type: 'error',
			})
		next({ path: '/401' })
	}
}

/**解决动态路由刷新页面后跳转404页面的问题 */
const addActiveRouter: AppBeforeEach = (to, from, next, options) => {
	const { router } = options
	const routerList = router?.getRoutes()
	if (to.name === 'nofind') {
		const realRouter = routerList?.find((route) => route.path === to.path)
		if (realRouter) {
			router?.replace(realRouter)
		} else {
			next({ path: '/404' })
		}
	}
	next()
}

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
const progressDone: AppAfterEach = () => {
	// finish progress bar
	NProgress.done()
}

const guards: RouterGuards = {
	beforeEach: [progressStart, addActiveRouter, authorityVerification],
	afterEach: [progressDone],
}

export default guards
