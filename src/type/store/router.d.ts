import { RouteRecordRaw } from 'vue-router';

export interface StoreRouter {
  routesConfig?: null | RouteRecordRaw[]
  [key: string]: any
}

export interface RoutesConfig {
  path?: string
  router: string
  icon?: string
  page?: any
  link?: string
  authority?: string
  invisible?: boolean
  meta?: {
    icon?: string
    page?: any
    link?: string
    authority?: string
    invisible?: boolean
  }
  children?: RoutesConfig[]
}