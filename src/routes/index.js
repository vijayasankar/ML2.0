// We only need to import the modules necessary for initial render
import CoreLayout from 'layouts/CoreLayout'
import ErrorLayout from 'layouts/ErrorLayout'
import Home from './Home'
import RequestPreApprovalRoute from './RequestPreApproval'
import RequestPayment from './RequestPayment'
import PreApprovals from './PreApprovals'
import Payments from './Payments'
import UserManagement from './UserManagement'
import CallbackRoute from './callback'
import CallbackSilentRenewRoute from './callbackSilentRenew'
import PageNotFoundRoute from './404'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

// ----------------------------------------------------------------------------
// #providerportal
// ----------------------------------------------------------------------------
export const createRoutes = (store) => ([
  {
    path        : '/providerportal/',
    component   : CoreLayout,
    indexRoute  : Home,
    childRoutes : [
      RequestPreApprovalRoute(store),
      RequestPayment(store),
      PreApprovals(store),
      Payments(store),
      UserManagement(store),
      CallbackRoute(),
      CallbackSilentRenewRoute()
    ]
  },
  {
    component   : ErrorLayout,
    childRoutes : [
      PageNotFoundRoute()
    ]
  },
  {
    path: '*',
    onEnter: ({ params }, replace) => {
      replace(`/providerportal/404`)
    }
  }
])

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
