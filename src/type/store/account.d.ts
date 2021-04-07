import { RouteRecordRaw } from 'vue-router';

export interface Account {
  user?: any,
  permissions?: string[] | null,
  roles?: string[] | null,
  routesConfig?: null | RouteRecordRaw[]
}