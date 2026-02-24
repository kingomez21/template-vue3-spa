<script setup lang="ts">
import { useSweetAlert } from '@/composables/useSweetAlert'

const {
  showAlert,
  showConfirmAlert,
  showConfirmAlerts,
  showToast,
  showLoading,
  hideLoading,
  showSuccess,
  showError,
  showWarning,
  showInfo,
} = useSweetAlert()

// Ejemplo de alerta simple
const handleSimpleAlert = () => {
  showAlert('Hola!', 'Este es un mensaje simple', 'info')
}

// Ejemplo de alerta de éxito
const handleSuccessAlert = () => {
  showSuccess('Operación exitosa', 'Los datos se guardaron correctamente')
}

// Ejemplo de alerta de error
const handleErrorAlert = () => {
  showError('Error', 'Ocurrió un error al procesar la solicitud')
}

// Ejemplo de alerta de advertencia
const handleWarningAlert = () => {
  showWarning('Advertencia', 'Por favor verifica los datos ingresados')
}

// Ejemplo de confirmación con callback
const handleConfirmCallback = () => {
  showConfirmAlert(
    '¿Estás seguro?',
    'Esta acción no se puede deshacer',
    () => {
      showToast('Acción confirmada', 'success')
    },
  )
}

// Ejemplo de confirmación con async/await
const handleConfirmAsync = async () => {
  const confirmed = await showConfirmAlerts(
    '¿Deseas continuar?',
    'Se eliminarán todos los registros seleccionados',
  )

  if (confirmed)
    showToast('Registros eliminados', 'success')

  else
    showToast('Acción cancelada', 'info', 2000)
}

// Ejemplo de toast
const handleToast = () => {
  showToast('Notificación exitosa!', 'success')
}

// Ejemplo de loading
const handleLoading = () => {
  showLoading('Procesando...', 'Esto puede tardar unos segundos')

  // Simular proceso
  setTimeout(() => {
    hideLoading()
    showSuccess('Proceso completado!')
  }, 3000)
}

// Ejemplo de toast con diferentes tipos
const handleToastVariants = (type: 'success' | 'error' | 'warning' | 'info') => {
  const messages = {
    success: 'Operación exitosa',
    error: 'Ocurrió un error',
    warning: 'Advertencia importante',
    info: 'Información útil',
  }

  showToast(messages[type], type, 2000)
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle class="text-h5">
            Ejemplos de SweetAlert2 sdsad
          </VCardTitle>
          <VCardSubtitle>
            Usa el composable <code>useSweetAlert()</code> en cualquier componente
          </VCardSubtitle>

          <VCardText>
            <VRow>
              <!-- Alertas Básicas -->
              <VCol
                cols="12"
                md="6"
              >
                <h3 class="text-h6 mb-4">
                  Alertas Básicas
                </h3>
                <div class="d-flex flex-column ga-2">
                  <VBtn
                    color="info"
                    @click="handleSimpleAlert"
                  >
                    Alerta Simple
                  </VBtn>
                  <VBtn
                    color="success"
                    @click="handleSuccessAlert"
                  >
                    Alerta de Éxito
                  </VBtn>
                  <VBtn
                    color="error"
                    @click="handleErrorAlert"
                  >
                    Alerta de Error
                  </VBtn>
                  <VBtn
                    color="warning"
                    @click="handleWarningAlert"
                  >
                    Alerta de Advertencia
                  </VBtn>
                </div>
              </VCol>

              <!-- Confirmaciones -->
              <VCol
                cols="12"
                md="6"
              >
                <h3 class="text-h6 mb-4">
                  Confirmaciones
                </h3>
                <div class="d-flex flex-column ga-2">
                  <VBtn
                    color="primary"
                    @click="handleConfirmCallback"
                  >
                    Confirmación con Callback
                  </VBtn>
                  <VBtn
                    color="secondary"
                    @click="handleConfirmAsync"
                  >
                    Confirmación Async/Await
                  </VBtn>
                </div>
              </VCol>

              <!-- Toast Notifications -->
              <VCol
                cols="12"
                md="6"
              >
                <h3 class="text-h6 mb-4">
                  Toast Notifications
                </h3>
                <div class="d-flex flex-column ga-2">
                  <VBtn
                    color="success"
                    variant="outlined"
                    @click="handleToast"
                  >
                    Toast Simple
                  </VBtn>
                  <div class="d-flex ga-2 flex-wrap">
                    <VBtn
                      color="success"
                      size="small"
                      @click="handleToastVariants('success')"
                    >
                      Success
                    </VBtn>
                    <VBtn
                      color="error"
                      size="small"
                      @click="handleToastVariants('error')"
                    >
                      Error
                    </VBtn>
                    <VBtn
                      color="warning"
                      size="small"
                      @click="handleToastVariants('warning')"
                    >
                      Warning
                    </VBtn>
                    <VBtn
                      color="info"
                      size="small"
                      @click="handleToastVariants('info')"
                    >
                      Info
                    </VBtn>
                  </div>
                </div>
              </VCol>

              <!-- Loading -->
              <VCol
                cols="12"
                md="6"
              >
                <h3 class="text-h6 mb-4">
                  Loading
                </h3>
                <div class="d-flex flex-column ga-2">
                  <VBtn
                    color="primary"
                    variant="outlined"
                    @click="handleLoading"
                  >
                    Mostrar Loading (3s)
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Código de ejemplo -->
      <VCol cols="12">
        <VCard>
          <VCardTitle class="text-h6">
            Código de Ejemplo
          </VCardTitle>
          <VCardText>
            <pre class="code-block"><code>&lt;script setup&gt;
import { useSweetAlert } from '@/composables/useSweetAlert'

const { showAlert, showToast, showConfirmAlerts } = useSweetAlert()

// Alerta simple
showAlert('Título', 'Mensaje', 'success')

// Toast
showToast('Mensaje rápido', 'success')

// Confirmación async
const confirmed = await showConfirmAlerts('¿Continuar?', 'Descripción')
if (confirmed) {
  // Usuario confirmó
}
&lt;/script&gt;</code></pre>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.code-block {
  padding: 1rem;
  border-radius: 4px;
  background-color: #f5f5f5;
  overflow-x: auto;
}

code {
  font-family: "Courier New", monospace;
  font-size: 0.875rem;
}

.v-theme--dark .code-block {
  background-color: #263238;
  color: #aed581;
}
</style>
