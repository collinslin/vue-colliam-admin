import Header from './header.vue'
import { RouteRecordNormalized } from 'vue-router';
export default Header

export type UserDropdownMethods = {
  mine: () => any
  setting: () => any
  logout: () => any
  [key: string]: () => any
}

export interface AppRouteRecordNormalized extends RouteRecordNormalized { title?: string }