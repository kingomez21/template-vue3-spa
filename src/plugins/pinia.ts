import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

export const store = createPinia()

// Plugin para persistir el estado en localStorage
store.use(piniaPluginPersistedstate)

export default function (app: App) {
  app.use(store)
}
