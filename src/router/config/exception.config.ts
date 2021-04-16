import { RouteRecordRaw } from 'vue-router'

const exception: RouteRecordRaw[] = [
	{
		path: '401',
		name: 'Exp401',
		component: () => import('../../pages/exception/401.vue'),
		meta: {
			hidden: true,
			icon: 'el-icon-remove-outline',
		},
	},
	{
		path: '404',
		name: 'Exp404',
		component: () => import('/@/pages/exception/404.vue'),
		meta: {
			hidden: true,
			icon: 'el-icon-question',
		},
	},
	{
		path: '500',
		name: 'Exp500',
		component: () => import('/@/pages/exception/500.vue'),
		meta: {
			hidden: true,
			icon: 'el-icon-loading',
		},
	},
]

export default exception
