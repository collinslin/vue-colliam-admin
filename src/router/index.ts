import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import root from './config/defautl.config'
import RootView from '/@/layout/rootView'
import { formatAuthority } from '/@/utils/routerUtils'
/**index文件用来配置不需要使用菜单栏的页面 */
const routes: Array<RouteRecordRaw> = [
	root,
	{
		path: '/redirect',
		name: 'redirect',
		component: RootView,
		meta: {
			hidden: true,
			useTab: false,
		},
		children: [
			{
				path: '/redirect/:path(.*)',
				name: 'redirectPage',
				component: () => import('/@/pages/redirect/index.vue'),
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/pages/login/login.vue'),
		meta: {
			useTab: false,
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'nofind',
		component: () => import('/@/pages/exception/404.vue'),
		meta: {
			useTab: false,
		},
	},
]

formatAuthority(routes)

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
