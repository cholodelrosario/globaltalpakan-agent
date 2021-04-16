
const routes = [
  {
    path: '/agent',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/withdrawals', component: () => import('pages/Withdraw.vue') },
      { path: '/send-credits', component: () => import('pages/SendCredits.vue') },
      { path: '/convert', component: () => import('pages/Convert.vue') },
      { path: '/invlink', component: () => import('pages/InvLink.vue') },///
      { path: '/convert-requests', component: () => import('pages/ConversionRequests.vue') },
      { path: '/movements', component: () => import('pages/Movements.vue') },
      { path: '/downlines', component: () => import('pages/Downlines.vue') },
      { path: '/stats', component: () => import('pages/StatsPage.vue') },
      { path: '/transactions', component: () => import('pages/Transactions.vue') },
      { path: '/all-withdrawals', component: () => import('pages/WithdrawalsAll.vue') },
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
