import Store from 'src/store'

const ifAuthenticated = (to, from, next) => {
  if (Store.getters['useraccount/isAuthenticated'] === null) {
      next('/')
    }
    next()
    return
}

const ifNotAuthenticated = (to, from, next) => {
  if (Store.getters['useraccount/isAuthenticated'] === null) {
    next()
    return
  }
  next('/agent')
}

const routes = [
  {
    path: '/agent',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: ifAuthenticated,
    children: [
      { path: '', component: () => import('pages/Dashboard.vue'),beforeEnter: ifAuthenticated },
      { path: '/withdrawals', component: () => import('pages/Withdraw.vue'),beforeEnter: ifAuthenticated },
      { path: '/send-credits', component: () => import('pages/SendCredits.vue'),beforeEnter: ifAuthenticated },
      { path: '/convert', component: () => import('pages/Convert.vue'),beforeEnter: ifAuthenticated },
      { path: '/invlink', component: () => import('pages/InvLink.vue'),beforeEnter: ifAuthenticated },///
      { path: '/convert-requests', component: () => import('pages/ConversionRequests.vue'),beforeEnter: ifAuthenticated },
      { path: '/movements', component: () => import('pages/Movements.vue'),beforeEnter: ifAuthenticated },
      { path: '/downlines', component: () => import('pages/Downlines.vue'),beforeEnter: ifAuthenticated },
      { path: '/stats', component: () => import('pages/StatsPage.vue'),beforeEnter: ifAuthenticated },
      { path: '/settings', component: () => import('pages/Settings.vue'),beforeEnter: ifAuthenticated },
      { path: '/transactions', component: () => import('pages/Transactions.vue'),beforeEnter: ifAuthenticated },
      { path: '/all-withdrawals', component: () => import('pages/WithdrawalsAll.vue'),beforeEnter: ifAuthenticated },
      { path: '/commission-history', component: () => import('pages/CommissionHistory.vue'),beforeEnter: ifAuthenticated },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue'),beforeEnter: ifNotAuthenticated }
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
