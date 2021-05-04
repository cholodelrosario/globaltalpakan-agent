import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import sms from './sms'
import useraccount from './useraccount'
import wallet from './wallet'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const Store = new Vuex.Store({
  modules: {
    // example
    sms,
    useraccount,
    wallet
  },
  plugins: [createPersistedState()],
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})

if (process.env.DEV && module.hot) {
  module.hot.accept(['./useraccount'], () => {
    const newuseraccount = require('./useraccount').default
    const newsms = require('./sms').default
    const newwallet = require('./wallet').default
    Store.hotUpdate({ 
      modules: { 
        notification: newsms,
        useraccount: newuseraccount,
        wallet: newwallet
       },
    })
  })
}

export default Store;

