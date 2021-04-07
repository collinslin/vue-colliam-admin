import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/page/login/login.vue'),
	},
	{
		path: '/home1',
		name: 'home1',
		component: () => import('/@/page/login/login.vue'),
		children: [
			{
				path: '/login1',
				name: 'login1',
				component: () => import('/@/page/login/login.vue'),
			},
		],
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
