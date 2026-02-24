import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'

// Tipo para los mensajes de i18n
export type MessageSchema = typeof es

// Crear instancia de i18n
const i18n = createI18n<[MessageSchema], 'es' | 'en'>({
  legacy: false, // Usar Composition API
  locale: localStorage.getItem('locale') || 'es', // Idioma por defecto
  fallbackLocale: 'en', // Idioma de respaldo
  messages: {
    es,
    en,
  },
  globalInjection: true, // Permitir usar $t en templates
})

// Exportar instancia para uso fuera de componentes
export default function (app: App) {
  app.use(i18n)
}

// Exportar i18n para uso en composables
export { i18n }
