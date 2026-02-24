# Generación de Iconos PWA

## 📦 Librería Instalada

- **pwa-asset-generator** - Generador multiplataforma de iconos PWA (compatible con Linux, Windows y macOS)

---

## 🎨 Generar Iconos

### Requisitos
- Tener un archivo `logo.png` en la raíz del proyecto (512x512 o superior recomendado)

### Comando

```bash
pnpm generate:pwa-icons
```

Este comando generará automáticamente:

- ✅ `android-chrome-192x192.png` - Icono Android 192x192
- ✅ `android-chrome-512x512.png` - Icono Android 512x512  
- ✅ `apple-touch-icon.png` - Icono iOS 180x180
- ✅ `apple-touch-icon-180x180.png` - Icono iOS específico
- ✅ `favicon.ico` - Favicon para navegadores
- ✅ Otros tamaños necesarios para PWA

---

## ⚙️ Configuración Aplicada

El script usa las siguientes opciones:

```bash
pwa-asset-generator logo.png public --icon-only --favicon --background "#ffffff" --padding "10%"
```

- `logo.png` - Archivo fuente desde la raíz
- `public` - Carpeta de destino
- `--icon-only` - Solo generar iconos (sin splash screens)
- `--favicon` - Incluir generación de favicon
- `--background "#ffffff"` - Fondo blanco para iconos
- `--padding "10%"` - Padding del 10% alrededor del logo

---

## 🎯 Personalizar Generación

Si necesitas cambiar la configuración, edita el script en `package.json`:

### Cambiar fondo
```json
"generate:pwa-icons": "pwa-asset-generator logo.png public --icon-only --favicon --background \"#9155FD\" --padding \"10%\""
```

### Incluir splash screens
```json
"generate:pwa-icons": "pwa-asset-generator logo.png public --favicon --background \"#ffffff\" --splash-only"
```

### Sin padding
```json
"generate:pwa-icons": "pwa-asset-generator logo.png public --icon-only --favicon --background \"transparent\""
```

---

## 📝 Pasos Después de Generar

1. **Ejecuta el comando:**
   ```bash
   pnpm generate:pwa-icons
   ```

2. **Verifica los archivos** en la carpeta `public/`:
   - Deberías ver los nuevos iconos generados

3. **Los iconos ya están configurados** en `vite.config.ts`:
   ```typescript
   manifest: {
     icons: [
       {
         src: '/android-chrome-192x192.png',
         sizes: '192x192',
         type: 'image/png',
       },
       {
         src: '/android-chrome-512x512.png',
         sizes: '512x512',
         type: 'image/png',
       },
       // ...
     ]
   }
   ```

4. **Prueba tu PWA:**
   ```bash
   pnpm build
   pnpm preview
   ```

---

## 🔍 Verificar Iconos

### En desarrollo
```bash
pnpm dev
```

Abre **DevTools > Application > Manifest** y verifica que los iconos aparezcan correctamente.

### En producción
```bash
pnpm build
pnpm preview
```

Verifica que la app sea instalable y los iconos se muestren correctamente en el instalador.

---

## 💡 Recomendaciones

### Logo de Entrada
- **Tamaño mínimo:** 512x512px
- **Formato:** PNG con transparencia
- **Resolución:** Alta calidad (sin pixelado)
- **Centro:** Logo centrado en el canvas

### Mejores Prácticas
- Usa un logo cuadrado con el contenido centrado
- Deja espacio alrededor del logo para el padding
- Evita texto pequeño (puede no verse bien en iconos pequeños)
- Usa colores sólidos y alto contraste

---

## 🛠️ Opciones Avanzadas

### Generar solo iconos específicos
```bash
pnpm dlx pwa-asset-generator logo.png public --icon-only --favicon --scrape false
```

### Con tamaños personalizados
```bash
pnpm dlx pwa-asset-generator logo.png public --icon-only --favicon --icon-sizes 192,512,180
```

### Con diferentes formatos
```bash
pnpm dlx pwa-asset-generator logo.png public --icon-only --favicon --type png,jpg
```

---

## 📚 Recursos

- [pwa-asset-generator Docs](https://github.com/elegantapp/pwa-asset-generator)
- [PWA Icon Requirements](https://web.dev/add-manifest/#icons)
- [Maskable Icon Editor](https://maskable.app/editor)

---

## ✅ Checklist

Después de generar los iconos:

- [ ] Ejecutaste `pnpm generate:pwa-icons`
- [ ] Los archivos PNG se crearon en `/public`
- [ ] El `favicon.ico` se generó
- [ ] Probaste en DevTools > Application > Manifest
- [ ] Los iconos se ven bien en diferentes tamaños
- [ ] La PWA es instalable desde el navegador

---

¡Listo! Tu PWA ahora tiene iconos profesionales generados automáticamente. 🎉
