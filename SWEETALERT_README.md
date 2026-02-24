# SweetAlert2 - Configuración y Uso

## 📦 Instalación Completada

SweetAlert2 ha sido instalado y configurado en el proyecto con integración completa de Vuetify e i18n.

---

## 🚀 Uso Básico

### En Componentes (Composition API)

```vue
<script setup>
import { useSweetAlert } from '@/composables/useSweetAlert'

const { showAlert, showToast, showConfirmAlerts } = useSweetAlert()

// Usar las funciones
const handleClick = () => {
  showAlert('¡Hola!', 'Este es un mensaje', 'success')
}
</script>
```

---

## 📚 Funciones Disponibles

### 1. `showAlert(title, text, icon)`
Muestra una alerta simple con un botón de OK.

```typescript
showAlert('Éxito', 'Los datos se guardaron correctamente', 'success')
showAlert('Error', 'Ocurrió un problema', 'error')
showAlert('Info', 'Información importante', 'info')
showAlert('Advertencia', 'Revisa los datos', 'warning')
```

**Parámetros:**
- `title` (string): Título de la alerta
- `text` (string, opcional): Texto descriptivo
- `icon` ('success' | 'error' | 'warning' | 'info' | 'question'): Icono a mostrar

---

### 2. `showSuccess(title, text)` / `showError(title, text)` / etc.
Atajos para tipos específicos de alertas.

```typescript
const { showSuccess, showError, showWarning, showInfo } = useSweetAlert()

showSuccess('¡Guardado!', 'Los cambios se aplicaron correctamente')
showError('Error', 'No se pudo conectar con el servidor')
showWarning('Advertencia', 'Verifica los datos ingresados')
showInfo('Información', 'Este campo es requerido')
```

---

### 3. `showConfirmAlert(title, text, callback)`
Muestra una alerta de confirmación con callback.

```typescript
const deleteItem = () => {
  showConfirmAlert(
    '¿Eliminar registro?',
    'Esta acción no se puede deshacer',
    () => {
      // Código a ejecutar si confirma
      console.log('Usuario confirmó')
      showToast('Registro eliminado', 'success')
    }
  )
}
```

**Parámetros:**
- `title` (string): Título de la confirmación
- `text` (string): Texto descriptivo
- `callback` (function): Función a ejecutar si el usuario confirma

---

### 4. `showConfirmAlerts(title, text)` ⭐ Recomendado
Muestra una alerta de confirmación que retorna una Promise (async/await).

```typescript
const deleteItem = async () => {
  const confirmed = await showConfirmAlerts(
    '¿Eliminar registro?',
    'Esta acción no se puede deshacer'
  )
  
  if (confirmed) {
    // Usuario confirmó
    await deleteFromAPI()
    showToast('Registro eliminado', 'success')
  } else {
    // Usuario canceló
    showToast('Acción cancelada', 'info')
  }
}
```

**Retorna:** `Promise<boolean>` - true si confirma, false si cancela

---

### 5. `showToast(title, icon, timer)`
Muestra una notificación toast en la esquina superior derecha.

```typescript
showToast('¡Guardado exitosamente!', 'success', 1500)
showToast('Operación completada', 'success') // timer por defecto: 1500ms
showToast('Error al guardar', 'error', 3000)
```

**Parámetros:**
- `title` (string): Mensaje a mostrar
- `icon` ('success' | 'error' | 'warning' | 'info'): Icono
- `timer` (number, opcional): Duración en milisegundos (default: 1500)

---

### 6. `showLoading(title, text)` y `hideLoading()`
Muestra/oculta un overlay de carga.

```typescript
const { showLoading, hideLoading } = useSweetAlert()

const processData = async () => {
  showLoading('Procesando...', 'Por favor espere')
  
  try {
    await someAsyncOperation()
    hideLoading()
    showSuccess('Completado!')
  } catch (error) {
    hideLoading()
    showError('Error', error.message)
  }
}
```

---

## 🎨 Ejemplos Completos

### Ejemplo 1: Formulario con Validación

```vue
<script setup>
import { ref } from 'vue'
import { useSweetAlert } from '@/composables/useSweetAlert'

const { showLoading, hideLoading, showSuccess, showError } = useSweetAlert()
const form = ref({ name: '', email: '' })

const submitForm = async () => {
  showLoading()

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(form.value),
    })

    hideLoading()

    if (response.ok) {
      showSuccess('Formulario enviado', 'Recibirás un correo de confirmación')
      form.value = { name: '', email: '' }
    }
    else {
      showError('Error', 'No se pudo enviar el formulario')
    }
  }
  catch (error) {
    hideLoading()
    showError('Error de conexión', error.message)
  }
}
</script>
```

---

### Ejemplo 2: Confirmación de Eliminación

```vue
<script setup>
import { useSweetAlert } from '@/composables/useSweetAlert'

const { showConfirmAlerts, showToast } = useSweetAlert()

const deleteUser = async userId => {
  const confirmed = await showConfirmAlerts(
    '¿Eliminar usuario?',
    'Esta acción eliminará todos los datos asociados',
  )

  if (confirmed) {
    try {
      await api.delete(`/users/${userId}`)
      showToast('Usuario eliminado correctamente', 'success')

      // Actualizar lista de usuarios
    }
    catch (error) {
      showToast('Error al eliminar', 'error', 3000)
    }
  }
}
</script>

<template>
  <VBtn
    color="error"
    @click="deleteUser(123)"
  >
    Eliminar Usuario
  </VBtn>
</template>
```

---

### Ejemplo 3: Proceso con Loading

```vue
<script setup>
import { useSweetAlert } from '@/composables/useSweetAlert'

const { showLoading, hideLoading, showSuccess, showToast } = useSweetAlert()

const processLargeFile = async file => {
  showLoading('Procesando archivo', 'Esto puede tardar unos minutos...')

  try {
    const result = await uploadFile(file)

    hideLoading()
    showSuccess('Archivo procesado', `Se procesaron ${result.records} registros`)
  }
  catch (error) {
    hideLoading()
    showToast('Error en el proceso', 'error', 3000)
  }
}
</script>
```

---

### Ejemplo 4: Notificaciones Toast Rápidas

```vue
<script setup>
import { useSweetAlert } from '@/composables/useSweetAlert'

const { showToast } = useSweetAlert()

const copyToClipboard = text => {
  navigator.clipboard.writeText(text)
  showToast('Copiado al portapapeles', 'success', 1000)
}

const saveSettings = () => {
  // Guardar configuración
  showToast('Configuración guardada', 'success')
}
</script>
```

---

## 🎯 Integración con i18n

Las alertas están integradas con vue-i18n. Los botones usan automáticamente las traducciones:

```typescript
// En locales/es.ts
common: {
  yesContinue: 'Sí, continuar',
  cancel: 'Cancelar',
  loading: 'Cargando...',
  pleaseWait: 'Por favor espere...',
}
```

Para usar traducciones personalizadas:

```typescript
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

showAlert(
  t('myModule.title'),
  t('myModule.description'),
  'success'
)
```

---

## 🎨 Estilos Personalizados

Los estilos están integrados con Vuetify y se ajustan automáticamente al tema.

**Archivo:** `src/assets/styles/sweetalert.scss`

### Personalizar colores:

```scss
// En tu archivo de variables
.swal2-confirm {
  &.swal2-styled {
    background-color: rgb(var(--v-theme-primary)) !important;
  }
}
```

---

## 🔧 Uso Avanzado

Para casos más complejos, accede directamente a la instancia de Swal:

```vue
<script setup>
import { useSweetAlert } from '@/composables/useSweetAlert'

const { Swal } = useSweetAlert()

const customAlert = () => {
  Swal.fire({
    title: 'Input personalizado',
    input: 'text',
    inputLabel: 'Ingresa tu nombre',
    inputPlaceholder: 'Juan Pérez',
    showCancelButton: true,
    inputValidator: value => {
      if (!value)
        return '¡Debes ingresar algo!'
    },
  }).then(result => {
    if (result.isConfirmed)
      console.log('Nombre:', result.value)
  })
}
</script>
```

---

## 📝 TypeScript

El composable está completamente tipado. Puedes ver las definiciones:

```typescript
interface UseSweetAlert {
  showAlert: (title: string, text?: string, icon?: SweetAlertIcon) => Promise<SweetAlertResult>
  showConfirmAlert: (title: string, text: string, confirmCallback: () => void) => void
  showConfirmAlerts: (title: string, text: string) => Promise<boolean>
  showToast: (title: string, icon?: SweetAlertIcon, timer?: number) => void
  showLoading: (title?: string, text?: string) => void
  hideLoading: () => void
  showSuccess: (title: string, text?: string) => Promise<SweetAlertResult>
  showError: (title: string, text?: string) => Promise<SweetAlertResult>
  showWarning: (title: string, text?: string) => Promise<SweetAlertResult>
  showInfo: (title: string, text?: string) => Promise<SweetAlertResult>
  Swal: typeof Swal
}
```

---

## 🎬 Demo

Visita el componente de ejemplo para ver todas las funcionalidades:

**Archivo:** `src/views/examples/SweetAlertExamples.vue`

---

## 📚 Recursos

- [SweetAlert2 Docs](https://sweetalert2.github.io/)
- [Composable: useSweetAlert](src/composables/useSweetAlert.ts)
- [Plugin Config](src/plugins/sweetalert/index.ts)
- [Estilos Personalizados](src/assets/styles/sweetalert.scss)

---

## ✅ Checklist de Configuración

- ✅ Paquete `sweetalert2` instalado
- ✅ Plugin configurado en `src/plugins/sweetalert/`
- ✅ Composable `useSweetAlert` creado
- ✅ Estilos personalizados con Vuetify
- ✅ Integración con vue-i18n
- ✅ Traducciones agregadas (es/en)
- ✅ Componente de ejemplo creado
- ✅ TypeScript completamente tipado

---

## 🚀 Siguiente Paso

Importa el composable en tus componentes y empieza a usar las alertas:

```typescript
import { useSweetAlert } from '@/composables/useSweetAlert'
```

¡Disfruta de las alertas elegantes y fáciles de usar! 🎉
