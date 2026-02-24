import Swal from 'sweetalert2'
import type { App } from 'vue'

// Configuración global de SweetAlert2
const swalConfig = {
  customClass: {
    popup: 'swal2-custom-popup',
    container: 'swal2-custom-container',
  },
  buttonsStyling: true, // Usar estilos por defecto de SweetAlert2
}

// Exportar instancia configurada
export const $swal = Swal.mixin(swalConfig)

// Plugin para Vue
export default function (app: App) {
  // Hacer disponible globalmente
  app.config.globalProperties.$swal = $swal
}

// Para uso en Composition API
export { Swal }
