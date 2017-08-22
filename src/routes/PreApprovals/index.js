import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'pre-approvals',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('./container').default
      const Header = require('components/Header').default
      const preApprovalsReducer = require('./modules').default

      injectReducer(store, {
        key: 'preApprovals',
        reducer: preApprovalsReducer
      })

      cb(null, { header: Header, main: Main })
    }, 'pre-approvals')
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
