import { injectReducer } from 'store/reducers'
import contains from 'ramda/src/contains'

const isSpecialist = (currentProviderDetails) => {
  return currentProviderDetails &&
    currentProviderDetails.serviceTypes &&
    contains('Specialist', currentProviderDetails.serviceTypes)
}

export default (store) => ({
  path : 'request-pre-approval',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('./container').default
      const Header = require('components/Header').default
      const requestPreApprovalReducer = require('./modules').default
      const requestPreApprovalVerifyPolicyReducer = require('./modules/verifyPolicy').default
      const requestPreApprovalProcedureCostReducer = require('./modules/procedureCost').default
      const requestPreApprovalAssociatedCostsReducer = require('./modules/associatedCosts').default

      injectReducer(store, {
        key: 'requestPreApproval',
        reducer: requestPreApprovalReducer
      })
      injectReducer(store, {
        key: 'requestPreApproval_verifyPolicy',
        reducer: requestPreApprovalVerifyPolicyReducer
      })
      injectReducer(store, {
        key: 'requestPreApproval_procedureCost',
        reducer: requestPreApprovalProcedureCostReducer
      })
      injectReducer(store, {
        key: 'requestPreApproval_associatedCosts',
        reducer: requestPreApprovalAssociatedCostsReducer
      })
      cb(null, { header: Header, main: Main })
    }, 'request-pre-approval')
  },
  // --------------------------------------------------------------------------
  // #providerportal
  // --------------------------------------------------------------------------
  onEnter: (nextState, replace) => {
    const state = store.getState()
    const myProviders = state.myProviders
    if (!myProviders || !isSpecialist(myProviders.currentProviderDetails)) {
      replace(`/providerportal/`)
    }
  }
})
