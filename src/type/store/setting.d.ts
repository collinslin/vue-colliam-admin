import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export interface Setting {
  menuData: RouteRecordRaw[] & { active?: boolean }
  tabbarData: tabbarData[]
  isCollapse: boolean
  [key: string]: any
}

export interface tabbarData extends RouteLocationNormalized {
  active?: boolean
}
