
const routes = [
  {
    path: '/agent',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/withdrawals', component: () => import('pages/Withdraw.vue') },
      { path: '/send-credits', component: () => import('pages/SendCredits.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
