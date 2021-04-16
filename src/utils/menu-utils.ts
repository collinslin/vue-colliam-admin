import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import store from '/@/store/index'
/**用于更改菜单栏的样式 */
export function changeMenuStyle(path: string) {
	const menuData = computed(() => store.state.setting?.menuData)
	menuData.value?.forEach((menu: RouteRecordRaw | any) => {
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