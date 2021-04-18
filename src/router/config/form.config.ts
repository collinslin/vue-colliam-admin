import { RouteRecordRaw } from 'vue-router'
const formRouterChildren: RouteRecordRaw[] = [
	{
		path: 'advanceForm',
		name: 'advanceForm',
		component: () => import('/@/pages/form/advanceForm'),
		meta: {
			title: '普通表单',
			authority: {
				role: ['visitor'],
			},
		},
	},
	{
		path: 'basicForm',
		name: 'basicForm',
		component: () => import('/@/pages/form/basicForm'),
		meta: {
			title: '验权表单',
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
			title: '步骤表单',
			authority: {
				role: ['visitor'],
			},
		},
	},
]

export default formRouterChildren
