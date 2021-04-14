import Header from './header.vue'
export default Header

export type UserDropdownMethods = {
  mine: () => any
  setting: () => any
  logout: () => any
  [key: string]: () => any
}