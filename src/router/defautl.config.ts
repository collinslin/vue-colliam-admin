import { RouteRecordRaw } from 'vue-router'
import RootView from '/@/layout/rootView'
import formRouterChildren from './form.config';

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
			path: 'form',
			name: 'form',
			component: () => import('/@/layout/pageView'),
			meta: {
				title: '表单',
				role: ['admin'],
			},
			children: formRouterChildren
		}

	],
}

export default root
