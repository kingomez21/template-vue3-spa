const loginRoutes = [
  {
    path: 'login',
    component: () => import('@/pages/login.vue'),
  },
  {
    path: 'register',
    component: () => import('@/pages/register.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/[...error].vue'),
  },
]

export default loginRoutes
