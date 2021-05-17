import { RouteRecordRaw } from 'vue-router'
import RootView from '/@/layout/rootView'
import PageView from '/@/layout/pageView'
import exception from './exception.config'
import formRouterChildren from './form.config'
import excelRouterChildren from './excel.config'

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
        icon: 'el-icon-s-home',
        isCloseTabbar: false,
        keepAlive: true,
      },
    },
    {
      path: 'form',
      name: 'form',
      component: PageView,
      meta: {
        title: '表单',
        icon: 'el-icon-edit-outline',
      },
      children: formRouterChildren,
    },
    {
      path: 'excel',
      name: 'excel',
      component: PageView,
      redirect: '/excel/luckysheet',
      meta: {
        title: 'excel表格',
        icon: 'el-icon-s-grid',
      },
      children: excelRouterChildren,
    },
    //错误页面
    ...exception,
  ],
}

export default root
