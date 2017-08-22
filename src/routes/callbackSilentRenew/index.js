import CallbackSilentRenewView from './components/CallbackSilentRenewView'

// Sync route definition
// ----------------------------------------------------------------------------
// #providerportal
// ----------------------------------------------------------------------------
export default (store) => ({
  path: '/providerportal/callback-silent-renew',
  components : { header: null, main: CallbackSilentRenewView }
})
