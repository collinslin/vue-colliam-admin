import { RouteRecordRaw } from 'vue-router';
const formRouterChildren: RouteRecordRaw[] = [
  {
    path: 'advanceForm',
    name: 'advanceForm',
    component: () => import('/@/pages/form/advanceForm'),
    meta: {
      role: ['admin'],
    },
  },
  {
    path: 'basicForm',
    name: 'basicForm',
    component: () => import('/@/pages/form/basicForm'),
    meta: {
      role: ['admin'],
    },
  },
  {
    path: 'stepForm',
    name: 'stepForm',
    component: () => import('/@/pages/form/stepForm'),
    meta: {
      role: ['admin'],
    },
  }
]


export default formRouterChildren