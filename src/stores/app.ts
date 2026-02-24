import { defineStore } from 'pinia'

/**
 * Store de ejemplo con persistencia activada
 * El estado se guardará automáticamente en localStorage
 */
export const useAppStore = defineStore('app', {
  state: () => ({
    // Configuración de la aplicación
    theme: 'light' as 'light' | 'dark',
    sidebarCollapsed: false,
    language: 'es',

    // Datos temporales (no se persisten)
    loading: false,
    notifications: [] as Array<{ id: string; message: string }>,
  }),

  getters: {
    isDarkTheme: state => state.theme === 'dark',
    notificationCount: state => state.notifications.length,
  },

  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    setLanguage(lang: string) {
      this.language = lang
    },

    setLoading(value: boolean) {
      this.loading = value
    },

    addNotification(message: string) {
      this.notifications.push({
        id: Date.now().toString(),
        message,
      })
    },

    removeNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1)
        this.notifications.splice(index, 1)
    },
  },

  // ✅ Configuración de persistencia
  persist: {
    key: 'app-settings',
    storage: localStorage,

    // Solo persistir estas propiedades
    paths: ['theme', 'sidebarCollapsed', 'language'],

    // loading y notifications NO se persisten
  },
})
