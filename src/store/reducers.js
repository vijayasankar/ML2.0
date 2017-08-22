import claimsHomeReducer from './claimsHome'
import locationReducer from './location'
import myProvidersReducer from './myProviders'
import paymentsReducer from 'routes/Payments/modules'
import policiesHomeReducer from './policiesHome'
import preApprovalsReducer from 'routes/PreApprovals/modules'
import requestPaymentCostsReducer from 'routes/RequestPayment/modules/costs'
import requestPaymentInvoiceDetailsReducer from 'routes/RequestPayment/modules/invoiceDetails'
import requestPaymentPreApprovalReducer from 'routes/RequestPayment/modules/preApproval'
import requestPaymentReducer from 'routes/RequestPayment/modules'
import requestPreApprovalProcedureCostReducer from 'routes/RequestPreApproval/modules/procedureCost'
import requestPreApprovalReducer from 'routes/RequestPreApproval/modules'
import requestPreApprovalVerifyPolicyReducer from 'routes/RequestPreApproval/modules/verifyPolicy'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as oidcReducer } from 'redux-oidc'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    claimsHome: claimsHomeReducer,
    form: formReducer,
    location: locationReducer,
    myProviders: myProvidersReducer,
    oidc: oidcReducer,
    payments: paymentsReducer,
    policiesHome: policiesHomeReducer,
    preApprovals: preApprovalsReducer,
    requestPayment: requestPaymentReducer,
    requestPayment_costs: requestPaymentCostsReducer,
    requestPayment_invoiceDetails: requestPaymentInvoiceDetailsReducer,
    requestPayment_preApproval: requestPaymentPreApprovalReducer,
    requestPreApproval: requestPreApprovalReducer,
    requestPreApproval_procedureCost: requestPreApprovalProcedureCostReducer,
    requestPreApproval_verifyPolicy: requestPreApprovalVerifyPolicyReducer,
    ...asyncReducers
  })
}

/* istanbul ignore next */
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
