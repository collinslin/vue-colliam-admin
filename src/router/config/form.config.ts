import { RouteRecordRaw } from 'vue-router'
const formRouterChildren: RouteRecordRaw[] = [
	{
		path: 'advanceForm',
		name: 'advanceForm',
		component: () => import('/@/pages/form/advanceForm'),
		meta: {
			authority: {
				role: ['admin'],
			},
		},
	},
	{
		path: 'basicForm',
		name: 'basicForm',
		component: () => import('/@/pages/form/basicForm'),
		meta: {
			authority: {
				role: ['admin'],
			},
		},
	},
	{
		path: 'stepForm',
		name: 'stepForm',
		component: () => import('/@/pages/form/stepForm'),
		meta: {
			authority: {
				role: ['admin'],
			},
		},
	},
]

export default formRouterChildren
