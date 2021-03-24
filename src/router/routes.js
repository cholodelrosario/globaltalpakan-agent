
const routes = [
  {
    path: '/player',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/event', component: () => import('pages/GameEventPage.vue') },
      { path: '/withdraw', component: () => import('pages/Withdraw.vue') },
      { path: '/buycredits', component: () => import('pages/AddCredits.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/enter', component: () => import('pages/LoginRegister.vue') },
      { path: '/events', component: () => import('pages/Events.vue') }
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
