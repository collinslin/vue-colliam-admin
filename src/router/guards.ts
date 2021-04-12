/**路由守卫 */
import {
	AppBeforeEach,
	AppAfterEach,
	RouterGuards,
} from '../type/router/guards'
import NProgress from 'nprogress'

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
	beforeEach: [progressStart],
	afterEach: [progressDone],
}

export default guards
