import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'payments',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('./container').default
      const Header = require('components/Header').default
      const paymentsReducer = require('./modules').default

      injectReducer(store, {
        key: 'payments',
        reducer: paymentsReducer
      })

      cb(null, { header: Header, main: Main })
    }, 'payments')
  },
  // --------------------------------------------------------------------------
  // #providerportal
  // --------------------------------------------------------------------------
  onEnter: (nextState, replace) => {
    const state = store.getState()
    const myProviders = state.myProviders
    if (!myProviders || !myProviders.currentProviderDetails || !myProviders.currentProviderDetails.serviceTypes) {
      replace(`/providerportal/`)
    }
  }
})
