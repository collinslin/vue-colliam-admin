import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import store from '/@/store/index'
/**检验路径是否为网络地址 */
export function isExternal(path: string) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export function isException(path: string) {
	return /(401|403|404|500)/.test(path)
}

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
	isExternal,
	isException,
}
