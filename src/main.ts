import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
// import { VueGoogleMaps, VueGoogleMapsConfig } from './plugins/vueGoogleMaps'
const pinia = createPinia()
const app = createApp(App)
// app.use(VueGoogleMaps, VueGoogleMapsConfig)
app.use(VueAxios, axios)
app.use(pinia)
app.use(router)
app.use(vuetify)

await router.isReady()
app.mount('#app')
