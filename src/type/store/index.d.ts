import { Account } from './account'
import { StoreRouter } from './router'
import { Setting } from './setting'

export interface Index {
	account?: Account
	routerSotre?: StoreRouter
	setting?: Setting
	[key: string]: any
}
