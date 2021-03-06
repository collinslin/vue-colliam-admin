import { ComponentPublicInstance } from '@vue/runtime-core'

import {
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteLocationRaw,
} from 'vue-router'
import { RunTimeOptions } from '/@/runTime'

declare type NavigationGuardNextCallback = (vm: ComponentPublicInstance) => any
declare type NavigationGuardReturn =
	| void
	| Error
	| RouteLocationRaw
	| boolean
	| NavigationGuardNextCallback
export interface AppBeforeEachRoute extends RouteLocationNormalized {
	active?: boolean
}
interface AppBeforeEach {
	(
		to: AppBeforeEachRoute,
		from: AppBeforeEachRoute,
		next: NavigationGuardNext,
		options: RunTimeOptions
	): NavigationGuardReturn | Promise<NavigationGuardReturn>
}
interface AppAfterEach {
	(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		options?: RunTimeOptions
	): any
}
export interface RouterGuards {
	beforeEach: AppBeforeEach[]
	afterEach: AppAfterEach[]
}
