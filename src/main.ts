import { registerSW } from 'virtual:pwa-register'
import { createApp } from 'vue'

import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'

// Create vue app
const app = createApp(App)

// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')

// Register Service Worker
registerSW({
  onNeedRefresh() {
    console.log('Nueva versión disponible. Recarga la página para actualizar.')
  },
  onOfflineReady() {
    console.log('App lista para trabajar sin conexión.')
  },
})
