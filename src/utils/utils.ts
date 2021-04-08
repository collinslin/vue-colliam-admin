/**检验路径是否为网络地址 */
export function isExternal(path: string) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
	isExternal,
}
