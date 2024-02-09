import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


//引入初始化的样式文件
import '@/styles/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')



import { lazyPlugin } from './directives'
app.use(lazyPlugin)
import { componentPlugin } from './components'
app.use(componentPlugin)

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)

