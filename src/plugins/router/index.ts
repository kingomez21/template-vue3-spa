import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  next()

  // Importa la store de Pinia aquí, dentro del beforeEach,
  // porque la store solo está disponible después de que Pinia se ha inicializado

  // const userStore = useUserStore()

  // 1. ¿La ruta a la que se intenta acceder requiere autenticación?
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 2. ¿La ruta a la que se intenta acceder es explícitamente pública?
  // Esto es útil para rutas como login, register, etc.
  // const isPublic = to.matched.some(record => record.meta.public)

  // Lógica de protección:
  /* if (requiresAuth && !userStore.isAuthenticated()) {
    // Si la ruta requiere autenticación y el usuario NO está logueado:
    // Redirige al usuario a la página de login.
    //console.log('Ruta protegida, redirigiendo a login.')
    //next('/login')
  } else if (isPublic && userStore.isAuthenticated()) {
    // Si el usuario ESTÁ logueado y intenta acceder a una ruta pública (como login, register):
    // Redirige al dashboard o a la página principal para evitar que vuelva a loguearse.
    console.log('Usuario logueado intentando acceder a ruta pública, redirigiendo a dashboard.')
    next('/v/dashboard')
  } else {
    // Si la ruta NO requiere autenticación, O si requiere y el usuario SÍ está logueado:
    // Permite la navegación.
    next()
  } */
})

export default function (app: App) {
  app.use(router)
}

export { router }
