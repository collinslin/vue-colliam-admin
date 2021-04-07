import { VNode } from 'vue'
interface MyDirective {
	name: string
	option: {
		created?: (el: HTMLElement, binding: any, vnode: VNode) => any
		beforeMount?: (el: HTMLElement, binding: any, vnode: VNode) => any
		mounted?: (el: HTMLElement, binding: any, vnode: VNode) => any
		beforeUpdate?: (el: HTMLElement, binding: any, vnode: VNode) => any
		updated?: (el: HTMLElement, binding: any, vnode: VNode) => any
		beforeUnmount?: (el: HTMLElement, binding: any, vnode: VNode) => any
		unmounted?: (el: HTMLElement, binding: any, vnode: VNode) => any
	}
}

const decorator: MyDirective = {
	name: 'decorator',
	option: {},
}
//角色
const role: MyDirective = {
	name: 'role',
	option: {
		mounted(el, binding, vnode) {
			const _this = binding.instance
			const value = binding.value
			const arg = binding.arg
			if (value) {
				if (value.length > 0) {
					value.forEach((item: string) => {
						if (item == 'click') {
							_this.$message({
								type: 'success',
								message: '你是管理员',
							})
						} else {
							el.classList.add('is-disabled')
							_this.$message({
								type: 'warning',
								message: '你并不是管理员',
							})
						}
					})
				} else {
					
				}
			}
		},
	},
}

//权限
const permission: MyDirective = {
	name: 'permission',
	option: {
		mounted(el, binding) {
			const _this = binding.instance
			const arg = binding.value
			arg.forEach((item: string) => {
				if (item == 'click') {
					_this.$message({
						type: 'success',
						message: '你有点击的权限',
					})
				} else {
					el.classList.add('is-disabled')
					_this.$message({
						type: 'warning',
						message: '你没有点击的权限',
					})
				}
			})
		},
	},
}

export default [decorator, role, permission]
