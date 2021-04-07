import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { elComponents, elPlugins } from '/@/plugin/element-plus'
import runTime from './runTime';
import directiveList from '/@/utils/directive'

const app = createApp(App)

app.use(store)
app.use(router)

elPlugins.forEach((plugin) => {
	app.use(plugin)
})

elComponents.forEach((component) => {
	app.component(component.name, component)
})

// 自定义指令
directiveList.forEach((directive) => {
	app.directive(directive.name, directive.option)
})

/**应用运行时加载应用配置 */
runTime({ router, store, message: app.config.globalProperties.$message })

app.mount('#app')
