import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: "login",
		component: () => import('/@/pages/login/login.vue'),
		children: [
			{
				path: 'home',
				name: 'home2',
				component: () => import('/@/pages/lgl/lgl.vue'),
			},
		]
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('/@/pages/lgl/lgl.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
