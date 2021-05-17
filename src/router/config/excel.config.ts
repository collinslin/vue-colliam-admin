import { RouteRecordRaw } from 'vue-router'
const excelRouterChildren: RouteRecordRaw[] = [
  {
    path: 'luckysheet',
    name: 'luckysheet',
    component: () => import('/@/pages/excel/luckysheet.vue'),
    meta: {
      title: 'luckysheet',
    },
  },
]

export default excelRouterChildren
