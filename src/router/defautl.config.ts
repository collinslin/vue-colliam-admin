import { RouteRecordRaw } from 'vue-router'
import RootView from '/@/layout/rootView'

/**该文件用于配置需要layout布局的路由
 * 为了防止项目后期庞大
 * 视情况彩粉路由配置
 */
const root: RouteRecordRaw = {
	path: '/',
	name: 'root',
	component: RootView,
	redirect: '/login',
	children: [
		{
			path: 'home',
			name: 'home',
			component: () => import('/@/pages/home/home.vue'),
			meta: {
				title: '首页',
				role: ['click'],
			},
		},
		{
			path: 'basicForm',
			name: 'basicForm',
			component: () => import('/@/pages/basicForm'),
			meta: {
				title: '权限表单',
				role: ['admin'],
			},
		},
	],
}

export default root
