import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { elComponents, elPlugins } from '/@/plugin/element-plus'
import directiveList from '/@/utils/directive'

console.log(router)

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

app.mount('#app')
