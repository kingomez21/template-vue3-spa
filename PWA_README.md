# Configuración PWA - Materio Template

## ✅ Configuración Completada

Tu aplicación ya está configurada como PWA con las siguientes características:

- ✅ `vite-plugin-pwa` instalado
- ✅ Service Worker configurado con auto-actualización
- ✅ Manifest.json generado automáticamente
- ✅ Meta tags PWA agregados al HTML
- ✅ Composable `usePwaUpdate` para manejar actualizaciones
- ✅ **Iconos PWA generados y configurados**

## 🎨 Iconos PWA Generados

Los siguientes iconos ya están disponibles en `/public`:
- ✅ `manifest-icon-192.maskable.png` (192x192) - Android
- ✅ `manifest-icon-512.maskable.png` (512x512) - Android
- ✅ `apple-icon-180.png` (180x180) - iOS
- ✅ `favicon-196.png` (196x196) - Favicon HD
- ✅ `favicon.ico` - Favicon estándar

### Regenerar Iconos

Si necesitas regenerar los iconos con un nuevo logo, coloca tu `logo.png` en la raíz del proyecto y ejecuta:

```bash
pnpm generate:pwa-icons
```

Ver más detalles en [PWA_ICONS_README.md](PWA_ICONS_README.md)

## 🚀 Verificar la Instalación

### En Desarrollo:
```bash
pnpm dev
```

Luego abre Chrome DevTools:
1. Ve a **Application** > **Manifest**
2. Verifica que todos los campos estén correctos
3. Ve a **Application** > **Service Workers**
4. Verifica que el SW esté registrado

### En Producción:
```bash
pnpm build
pnpm preview
```

### ✅ Checklist de Verificación:

- [ ] Manifest carga correctamente (DevTools > Application > Manifest)
- [ ] Service Worker registrado (DevTools > Application > Service Workers)
- [ ] Los iconos aparecen en el manifest
- [ ] App es instalable (icono de instalación en la barra de direcciones)
- [ ] Funciona offline (DevTools > Network > cambiar a "Offline")
- [ ] Al actualizar el código, el usuario ve un mensaje de actualización

## 🔧 Personalización

### Cambiar Colores y Nombres

Edita el archivo `vite.config.ts`:

```typescript
manifest: {
  name: 'Tu App Nombre Completo',
  short_name: 'TuApp',
  description: 'Descripción de tu aplicación',
  theme_color: '#TU_COLOR',
  background_color: '#ffffff',
  // ... resto de configuración
}
```

### Usar el Composable de Actualización

Si quieres mostrar un mensaje personalizado cuando hay una actualización disponible:

```vue
<script setup>
import { usePwaUpdate } from '@/composables/usePwaUpdate'

const { needRefresh, offlineReady, refresh, close } = usePwaUpdate()
</script>

<template>
  <!-- Mensaje cuando hay una actualización -->
  <VSnackbar
    v-model="needRefresh"
    :timeout="-1"
  >
    Nueva versión disponible
    <template #actions>
      <VBtn
        color="primary"
        @click="refresh"
      >
        Actualizar
      </VBtn>
      <VBtn @click="close">
        Cerrar
      </VBtn>
    </template>
  </VSnackbar>

  <!-- Mensaje cuando está lista para offline -->
  <VSnackbar
    v-model="offlineReady"
    timeout="3000"
  >
    App lista para trabajar sin conexión
  </VSnackbar>
</template>
```

## 📱 Probar la Instalación

### En Chrome/Edge:
1. Abre la app en el navegador
2. Busca el icono de instalación en la barra de direcciones (⊕)
3. Click en "Instalar"

### En Android:
1. Abre la app en Chrome
2. Menú > "Añadir a la pantalla de inicio"

### En iOS:
1. Abre la app en Safari
2. Click en el botón "Compartir"
3. "Añadir a la pantalla de inicio"

## 🔍 Recursos Adicionales

- [vite-plugin-pwa Docs](https://vite-pwa-org.netlify.app/)
- [Workbox](https://developer.chrome.com/docs/workbox/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Checklist](https://web.dev/pwa-checklist/)

## 🐛 Troubleshooting

### El Service Worker no se actualiza:
- Limpia la caché del navegador
- En DevTools > Application > Service Workers, click "Unregister" y recarga

### La app no es instalable:
- Verifica que los iconos existan en `/public`
- Asegúrate de servir la app sobre HTTPS (o localhost)
- Verifica el manifest en DevTools

### Archivos grandes no se cachean:
- Aumenta `maximumFileSizeToCacheInBytes` en `vite.config.ts`
