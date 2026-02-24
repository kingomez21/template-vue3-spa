import { registerSW } from 'virtual:pwa-register'
import { ref } from 'vue'

export function usePwaUpdate() {
  const needRefresh = ref(false)
  const offlineReady = ref(false)

  const updateSW = registerSW({
    onNeedRefresh() {
      needRefresh.value = true
      console.log('Nueva versión disponible')
    },
    onOfflineReady() {
      offlineReady.value = true
      console.log('App lista para trabajar sin conexión')
    },
  })

  const refresh = () => {
    updateSW(true)
  }

  const close = () => {
    needRefresh.value = false
    offlineReady.value = false
  }

  return { needRefresh, offlineReady, refresh, close }
}
