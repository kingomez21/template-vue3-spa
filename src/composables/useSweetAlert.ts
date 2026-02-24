import type { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'
import Swal from 'sweetalert2'
import { i18n } from '@/plugins/i18n'

/**
 * Configuración base para todas las alertas
 */
const baseConfig = {
  customClass: {
    popup: 'swal2-custom-popup',
    container: 'swal2-custom-container',
  },
  buttonsStyling: true, // Usar estilos por defecto de SweetAlert2
}

/**
 * Configuración común para posicionamiento
 */
const applyCommonStyles = () => {
  const container = Swal.getContainer()
  if (container) {
    container.classList.add('position-fixed')
    container.style.zIndex = '9999'
    container.style.insetBlockStart = '0'
    container.style.insetInline = '0 0'
  }
}

/**
 * Composable para usar SweetAlert2 en componentes Vue
 */
export function useSweetAlert() {
  /**
   * Muestra una alerta simple
   * @param title - Título de la alerta
   * @param text - Texto de la alerta
   * @param icon - Icono: 'success' | 'error' | 'warning' | 'info' | 'question'
   */
  const showAlert = (
    title: string,
    text?: string,
    icon: SweetAlertIcon = 'info',
  ): Promise<SweetAlertResult> => {
    return Swal.fire({
      ...baseConfig,
      title,
      text,
      icon,
      didOpen: applyCommonStyles,
    })
  }

  /**
   * Muestra una alerta de confirmación con callback
   * @param title - Título de la alerta
   * @param text - Texto de la alerta
   * @param confirmCallback - Función a ejecutar si se confirma
   */
  const showConfirmAlert = (
    title: string,
    text: string,
    confirmCallback: () => void,
  ): void => {
    Swal.fire({
      ...baseConfig,
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: i18n.global.t('common.yesContinue'),
      cancelButtonText: i18n.global.t('common.cancel'),
      didOpen: applyCommonStyles,
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed && typeof confirmCallback === 'function')
        confirmCallback()
    })
  }

  /**
   * Muestra una alerta de confirmación con Promise
   * @param title - Título de la alerta
   * @param text - Texto de la alerta
   * @returns Promise<boolean> - true si se confirma, false si se cancela
   */
  const showConfirmAlerts = async (
    title: string,
    text: string,
  ): Promise<boolean> => {
    return new Promise(resolve => {
      Swal.fire({
        ...baseConfig,
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: i18n.global.t('common.yesContinue'),
        cancelButtonText: i18n.global.t('common.cancel'),
        didOpen: applyCommonStyles,
      }).then((result: SweetAlertResult) => {
        resolve(result.isConfirmed)
      })
    })
  }

  /**
   * Muestra un toast notification
   * @param title - Título del toast
   * @param icon - Icono del toast
   * @param timer - Duración en milisegundos
   */
  const showToast = (
    title: string,
    icon: SweetAlertIcon = 'success',
    timer = 1500,
  ): void => {
    Swal.fire({
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer,
      toast: true,
      width: '300px',
      didOpen: () => {
        const container = Swal.getContainer()
        if (container)
          container.style.zIndex = '9999'
      },
    })
  }

  /**
   * Muestra un loading overlay
   * @param title - Título del loading
   * @param text - Texto del loading
   */
  const showLoading = (
    title = i18n.global.t('common.loading'),
    text = i18n.global.t('common.pleaseWait'),
  ): void => {
    Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-loading-popup',
        container: 'custom-loading-container',
      },
      didOpen: () => {
        Swal.showLoading()
        applyCommonStyles()
      },
    })
  }

  /**
   * Oculta el loading overlay
   */
  const hideLoading = (): void => {
    Swal.close()
  }

  /**
   * Muestra un mensaje de éxito
   * @param title - Título del mensaje
   * @param text - Texto del mensaje
   */
  const showSuccess = (title: string, text?: string): Promise<SweetAlertResult> => {
    return showAlert(title, text, 'success')
  }

  /**
   * Muestra un mensaje de error
   * @param title - Título del mensaje
   * @param text - Texto del mensaje
   */
  const showError = (title: string, text?: string): Promise<SweetAlertResult> => {
    return showAlert(title, text, 'error')
  }

  /**
   * Muestra un mensaje de advertencia
   * @param title - Título del mensaje
   * @param text - Texto del mensaje
   */
  const showWarning = (title: string, text?: string): Promise<SweetAlertResult> => {
    return showAlert(title, text, 'warning')
  }

  /**
   * Muestra un mensaje informativo
   * @param title - Título del mensaje
   * @param text - Texto del mensaje
   */
  const showInfo = (title: string, text?: string): Promise<SweetAlertResult> => {
    return showAlert(title, text, 'info')
  }

  return {
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

    // Instancia de Swal para casos avanzados
    Swal,
  }
}
