import { createApp } from 'vue'
import './style.css'
import router from './router/route'
import App from './pages/App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
