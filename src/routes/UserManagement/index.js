import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'user-management',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('./container').default
      const Header = require('components/Header').default
      const userManagementReducer = require('./modules').default

      injectReducer(store, {
        key: 'userManagement',
        reducer: userManagementReducer
      })
      cb(null, { header: Header, main: Main })
    }, 'user-management')
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
