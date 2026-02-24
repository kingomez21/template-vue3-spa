import { useSweetAlert } from '@/composables/useSweetAlert'

// ========================================
// GUÍA RÁPIDA - SWEETALERT2
// ========================================

// 1️⃣ Importar en tu componente
const {
  showAlert,
  showToast,
  showConfirmAlerts,
  showLoading,
  hideLoading,
  showSuccess,
  showError,
} = useSweetAlert()

// ========================================
// EJEMPLOS COMUNES
// ========================================

// ✅ Alerta de éxito simple
export const exampleSuccess = () => {
  showSuccess('¡Guardado!', 'Los datos se guardaron correctamente')
}

// ❌ Alerta de error
export const exampleError = () => {
  showError('Error', 'No se pudo completar la operación')
}

// 💬 Toast rápido (esquina superior derecha)
export const exampleToast = () => {
  showToast('Operación exitosa', 'success')
}

// ❓ Confirmación async/await
export const exampleConfirm = async () => {
  const confirmed = await showConfirmAlerts(
    '¿Eliminar elemento?',
    'Esta acción no se puede deshacer',
  )

  if (confirmed) {
    // Usuario confirmó
    showToast('Elemento eliminado', 'success')
  }
}

// ⏳ Loading
export const exampleLoading = async () => {
  showLoading('Procesando...', 'Por favor espere')

  // Simular operación
  await new Promise(resolve => setTimeout(resolve, 2000))

  hideLoading()
  showSuccess('Completado!')
}

// ========================================
// CASO DE USO REAL: GUARDAR FORMULARIO
// ========================================
export const saveForm = async (formData: any) => {
  showLoading()

  try {
    const response = await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    hideLoading()

    if (response.ok) {
      showSuccess('Formulario guardado', 'Los datos se enviaron correctamente')

      return true
    }
    else {
      showError('Error', 'No se pudo guardar el formulario')

      return false
    }
  }
  catch (error) {
    hideLoading()
    showError('Error de conexión', 'Verifica tu conexión a internet')

    return false
  }
}

// ========================================
// CASO DE USO REAL: ELIMINAR CON CONFIRMACIÓN
// ========================================
export const deleteItem = async (itemId: string) => {
  const confirmed = await showConfirmAlerts(
    '¿Eliminar este elemento?',
    'Esta acción no se puede deshacer',
  )

  if (!confirmed)
    return false

  showLoading('Eliminando...')

  try {
    await fetch(`/api/items/${itemId}`, { method: 'DELETE' })
    hideLoading()
    showToast('Elemento eliminado', 'success')

    return true
  }
  catch (error) {
    hideLoading()
    showError('Error al eliminar', 'Inténtalo de nuevo')

    return false
  }
}

// ========================================
// INTEGRACIÓN EN COMPONENTE VUE
// ========================================
/*
<script setup>
import { useSweetAlert } from '@/composables/useSweetAlert'

const { showToast, showConfirmAlerts, showLoading, hideLoading } = useSweetAlert()

const handleSave = async () => {
  showLoading()

  try {
    await api.save(data)
    hideLoading()
    showToast('Guardado exitosamente', 'success')
  } catch (error) {
    hideLoading()
    showToast('Error al guardar', 'error')
  }
}

const handleDelete = async () => {
  const confirmed = await showConfirmAlerts(
    '¿Eliminar?',
    'No se puede deshacer'
  )

  if (confirmed) {
    await api.delete(id)
    showToast('Eliminado', 'success')
  }
}
</script>

<template>
  <v-btn @click="handleSave">Guardar</v-btn>
  <v-btn @click="handleDelete" color="error">Eliminar</v-btn>
</template>
*/
