import { createApp } from 'vue'
import './style.css'
import router from './router/router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import App from './App.vue'


const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(pinia)
app.mount('#app')
