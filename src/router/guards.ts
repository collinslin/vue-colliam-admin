/**路由守卫 */
import {
	AppBeforeEach,
	AppAfterEach,
	RouterGuards,
} from '../type/router/guards'
import NProgress from 'nprogress'
import store from '../store'

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
const addTabbar: AppBeforeEach = (to, form, next) => {
	if (!to.path.includes('/login')) {
		const tabbarData = store.state.setting?.tabbarData
		const inTabbar = tabbarData?.find((tabbar) => tabbar.path == to.path)
		if (!inTabbar) {
			store.state.setting?.tabbarData.push(to)
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
	beforeEach: [progressStart, addTabbar],
	afterEach: [progressDone],
}

export default guards
