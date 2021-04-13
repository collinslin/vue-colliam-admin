import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import root from './config/defautl.config'
import RootView from '/@/layout/rootView'

/**index文件用来配置不需要layout布局的页面 */
const routes: Array<RouteRecordRaw> = [
	root,
	{
		path: '/redirect',
		component: RootView,
		meta: {
			hidden: true,
		},
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('/@/pages/redirect/index.vue'),
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/pages/login/login.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
