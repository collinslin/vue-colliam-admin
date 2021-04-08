import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import RootView from '/@/layout/rootView'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '首页',
		component: RootView,
		redirect: '/login',
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('/@/pages/home/home.vue'),
				meta: {
					role: ['click'],
				},
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
