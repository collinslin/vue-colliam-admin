import { RouteRecordRaw } from 'vue-router'
import store from '/@/store/index'
/**用于更改菜单栏的样式 */
export function changeMenuStyle(path: string) {
	const menuData = store.state.setting?.menuData
	menuData?.forEach((menu: RouteRecordRaw | any) => {
		if (path.includes(menu.path)) {
			menu.active = true
		} else {
			menu.active = false
		}
	})
}

export default {
	changeMenuStyle,
}
