# Nuevas Configuraciones - Plugins Instalados

## 📦 Paquetes Instalados

### 1. **pinia-plugin-persistedstate** 
Plugin para persistir el estado de Pinia en localStorage/sessionStorage

### 2. **vue-i18n**
Sistema de internacionalización (i18n) para Vue 3

### 3. **vite-plugin-vue-devtools** (dev)
Herramientas de desarrollo para Vue 3 en Vite

---

## 🔧 Configuraciones Realizadas

### 1. Pinia Plugin Persistedstate

**Archivo modificado:** [src/plugins/pinia.ts](src/plugins/pinia.ts)

El plugin ya está activo globalmente. Para usarlo en tus stores:

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    preferences: {},
  }),
  
  // ✅ Para persistir todo el estado
  persist: true,
  
  // O con configuración personalizada:
  persist: {
    key: 'user-store', // Clave en localStorage
    storage: localStorage, // o sessionStorage
    paths: ['name', 'email'], // Solo persistir estos campos
  },
})
```

**Opciones disponibles:**
- `key`: Nombre de la clave en storage (default: store.$id)
- `storage`: `localStorage` o `sessionStorage` (default: localStorage)
- `paths`: Array de propiedades a persistir (default: todas)
- `beforeRestore`: Hook antes de restaurar
- `afterRestore`: Hook después de restaurar

---

### 2. Vue I18n

**Archivos creados:**
- [src/plugins/i18n/index.ts](src/plugins/i18n/index.ts) - Configuración principal
- [src/plugins/i18n/locales/es.ts](src/plugins/i18n/locales/es.ts) - Traducciones español
- [src/plugins/i18n/locales/en.ts](src/plugins/i18n/locales/en.ts) - Traducciones inglés
- [src/composables/useLocale.ts](src/composables/useLocale.ts) - Composable helper

#### Uso en Componentes:

**Opción 1 - Composition API (Recomendado):**
```vue
<script setup>

// Auto-importado gracias a unplugin-auto-import
// O usar el composable personalizado
import { useLocale } from '@/composables/useLocale'

const { t, locale } = useI18n()
const { locale, setLocale, availableLocales } = useLocale()
</script>

<template>
  <div>
    <h1>{{ t('common.welcome') }}</h1>
    <p>{{ t('navigation.dashboard') }}</p>

    <!-- Cambiar idioma -->
    <VBtn @click="setLocale('es')">
      Español
    </VBtn>
    <VBtn @click="setLocale('en')">
      English
    </VBtn>

    <!-- Mostrar idioma actual -->
    <p>Idioma actual: {{ locale }}</p>
  </div>
</template>
```

**Opción 2 - Con $t global:**
```vue
<template>
  <div>
    <h1>{{ $t('common.welcome') }}</h1>
    <p>{{ $t('navigation.dashboard') }}</p>
  </div>
</template>
```

#### Agregar nuevas traducciones:

Edita los archivos en `src/plugins/i18n/locales/`:

```typescript
// es.ts
export default {
  common: {
    welcome: 'Bienvenido',
    // Agregar más...
  },
  myModule: { // Nuevo módulo
    title: 'Mi Módulo',
    description: 'Descripción',
  },
}
```

#### Traducciones con parámetros:

```typescript
// locales/es.ts
export default {
  common: {
    greeting: 'Hola {name}, tienes {count} mensajes',
  },
}
```

```vue
<template>
  <p>{{ t('common.greeting', { name: 'Juan', count: 5 }) }}</p>
  <!-- Output: Hola Juan, tienes 5 mensajes -->
</template>
```

#### Uso fuera de componentes:

```typescript
import { i18n } from '@/plugins/i18n'

function myFunction() {
  const message = i18n.global.t('common.welcome')
  console.log(message)
}
```

---

### 3. Vite Plugin Vue DevTools

**Archivo modificado:** [vite.config.ts](vite.config.ts)

Las DevTools se activan automáticamente en modo desarrollo. 

#### Características:
- 📊 Inspector de componentes en tiempo real
- 🔍 Explorador de estado (Pinia, Router, etc.)
- ⚡ Timeline de eventos
- 📝 Inspector de rutas
- 🎨 Panel de assets

#### Uso:
1. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

2. Las DevTools aparecerán automáticamente en tu navegador

3. O abre manualmente: `http://localhost:5173/__devtools__/`

---

## 📚 Ejemplos de Uso Completos

### Ejemplo 1: Store Persistente con i18n

```typescript
// src/stores/settings.ts
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: 'light',
    language: 'es',
    notifications: true,
  }),
  
  actions: {
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    },
    
    setLanguage(lang: 'es' | 'en') {
      this.language = lang
    },
  },
  
  persist: true, // ✅ Se guarda automáticamente en localStorage
})
```

### Ejemplo 2: Componente con Selector de Idioma

```vue
<script setup>
import { useLocale } from '@/composables/useLocale'
import { useSettingsStore } from '@/stores/settings'

const { locale, setLocale, availableLocales } = useLocale()
const settingsStore = useSettingsStore()

const changeLanguage = (lang: 'es' | 'en') => {
  setLocale(lang)
  settingsStore.setLanguage(lang)
}
</script>

<template>
  <div>
    <h2>{{ $t('navigation.settings') }}</h2>

    <VSelect
      :model-value="locale"
      :items="availableLocales"
      label="Idioma / Language"
      @update:model-value="changeLanguage"
    />

    <p>{{ $t('common.welcome') }}</p>
  </div>
</template>
```

### Ejemplo 3: Store con Persistencia Selectiva

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    username: '',
    email: '',
    temporaryData: null, // No se persistirá
  }),
  
  persist: {
    key: 'user-data',
    storage: localStorage,
    paths: ['token', 'username', 'email'], // Solo estos se guardan
  },
})
```

---

## 🎯 Beneficios

### Pinia Plugin Persistedstate:
- ✅ Estado persistente entre recargas
- ✅ Fácil sincronización entre pestañas
- ✅ Control granular de qué persistir

### Vue I18n:
- ✅ Soporte multiidioma completo
- ✅ Auto-importación con TypeScript
- ✅ Traducciones reactivas
- ✅ Persistencia del idioma seleccionado

### Vue DevTools:
- ✅ Debugging más eficiente
- ✅ Inspección de estado en tiempo real
- ✅ Timeline de eventos
- ✅ Solo activo en desarrollo

---

## 📖 Recursos

- [Pinia Plugin Persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [Vite Plugin Vue DevTools](https://devtools-next.vuejs.org/)

---

## ⚠️ Notas

### Advertencias de Peer Dependencies:

1. **pinia-plugin-persistedstate** requiere Pinia >= 3.0.0 (actual: 2.3.0)
   ```bash
   # Para actualizar Pinia:
   pnpm add pinia@latest
   ```

2. **vite-plugin-vue-devtools** requiere Vite >= 6.0.0 (actual: 5.4.11)
   ```bash
   # Para actualizar Vite:
   pnpm add vite@latest -D
   ```

Estas advertencias no afectan la funcionalidad actual, pero considera actualizar las dependencias para aprovechar las últimas características.
