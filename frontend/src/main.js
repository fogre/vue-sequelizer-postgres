import { createApp } from 'vue'
import { VueQueryPlugin } from 'vue-query'
import { plugin, defaultConfig } from '@formkit/vue'
import router from './views/router'
import App from './App.vue'
import './assets/global.css'

createApp(App)
  .use(VueQueryPlugin)
  .use(router)
  .use(plugin, defaultConfig)
  .mount('#app')
