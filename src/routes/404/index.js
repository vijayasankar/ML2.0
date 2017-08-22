import PageNotFoundView from './components/PageNotFoundView'

// Sync route definition
// ----------------------------------------------------------------------------
// #providerportal
// ----------------------------------------------------------------------------
export default (store) => ({
  path: '/providerportal/404',
  components : { main: PageNotFoundView }
})
