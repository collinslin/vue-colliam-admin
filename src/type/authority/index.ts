import { VNode } from '@vue/runtime-core'

export interface MyDirective {
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
