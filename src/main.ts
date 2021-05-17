import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { elComponents, elPlugins } from '/@/plugin/element-plus'
import runTime from './runTime'
import 'nprogress/nprogress.css' // 进度条样式文件
import AuthorityPlugin from '/@/plugin/authority'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(AuthorityPlugin)

elPlugins.forEach(plugin => {
  app.use(plugin)
})

elComponents.forEach(component => {
  app.component(component.name, component)
})

/**应用运行时加载应用配置 */
runTime({ router, store, message: app.config.globalProperties.$message }, app)

app.mount('#app')

console.log(import.meta.env)
