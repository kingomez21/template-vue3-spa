import { defineStore } from 'pinia'

/**
 * Store de ejemplo con persistencia activada
 * El estado se guardará automáticamente en localStorage
 */
export const useAppStore = defineStore('app', () => {
  const app = reactive<any>({
    appName: 'Process Management System',
    version: '1.0.0',
    progress: false,
    messageProgress: '',
    menu: [] as any[],
  })

  function updateAppName(newName: string) {
    app.appName = newName
  }

  function setProgress(isInProgress: boolean) {
    app.progress = isInProgress
  }

  function setMessageProgress(message: string) {
    app.messageProgress = message
  }

  function setMenu(menuItems: any[]) {
    app.menu = menuItems
  }

  return { app, updateAppName, setProgress, setMessageProgress, setMenu }
})
