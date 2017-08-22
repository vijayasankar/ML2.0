import CallbackView from './components/CallbackView'

// Sync route definition
// ----------------------------------------------------------------------------
// #providerportal
// ----------------------------------------------------------------------------
export default (store) => ({
  // path: '/callback',
  path: '/providerportal/callback',
  components : { header: null, main: CallbackView }
})
