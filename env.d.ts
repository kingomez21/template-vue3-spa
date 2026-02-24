import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    action?: string
    subject?: string
    layoutWrapperClasses?: string
    navActiveLink?: RouteLocationRaw
    layout?: 'blank' | 'default'
    unauthenticatedOnly?: boolean
    public?: boolean
  }
}

// Tipos para SweetAlert2
declare module 'vue' {
  interface ComponentCustomProperties {
    $swal: typeof import('sweetalert2').default
  }
}

// Tipos para vue-i18n
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // Auto-complete para i18n en template
  }
}
