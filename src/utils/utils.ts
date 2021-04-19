/**检验路径是否为网络地址 */
export function isExternal(path: string) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export function isException(path: string) {
	return /(401|403|404|500)/.test(path)
}

export function checkType(target: any) {
	return toString.call(target)
}

export default {
	isExternal,
	isException,
	checkType,
}
