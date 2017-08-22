import { injectReducer } from 'store/reducers'
// import contains from 'ramda/src/contains'

// const isSpecialist = (currentProviderDetails) => {
//   return currentProviderDetails &&
//     currentProviderDetails.serviceTypes &&
//     contains('Specialist', currentProviderDetails.serviceTypes)
// }

export default (store) => ({
  path : 'request-payment',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('./container').default
      const Header = require('components/Header').default
      const requestPaymentReducer = require('./modules').default
      const requestPaymentPreApprovalReducer = require('./modules/preApproval').default
      const requestPaymentCostsReducer = require('./modules/costs').default

      injectReducer(store, {
        key: 'requestPayment',
        reducer: requestPaymentReducer
      })
      injectReducer(store, {
        key: 'requestPayment_preApproval',
        reducer: requestPaymentPreApprovalReducer
      })
      injectReducer(store, {
        key: 'requestPayment_costs',
        reducer: requestPaymentCostsReducer
      })
      cb(null, { header: Header, main: Main })
    }, 'request-payment')
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
