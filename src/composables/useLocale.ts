import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'

/**
 * Composable para manejar la internacionalización
 * @returns { locale, setLocale, availableLocales, t }
 */
export function useLocale() {
  const locale = computed({
    get: () => i18n.global.locale.value,
    set: (value: 'es' | 'en') => {
      i18n.global.locale.value = value
      localStorage.setItem('locale', value)
    },
  })

  const setLocale = (newLocale: 'es' | 'en') => {
    locale.value = newLocale
  }

  const availableLocales = computed(() => i18n.global.availableLocales)

  // Alias para traducción (opcional, ya está disponible globalmente)
  const { t } = i18n.global

  return {
    locale,
    setLocale,
    availableLocales,
    t,
  }
}
