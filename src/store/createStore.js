import { applyMiddleware, compose, createStore } from 'redux'
// import { Log as OidcLog } from 'oidc-client'
// import createOidcMiddleware from 'redux-oidc'
import { loadUser } from 'redux-oidc'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'
import { createLogger } from 'redux-logger'
import oidcUserManager from 'utils/oidcUserManager'
import rootSaga from './sagas'

/* istanbul ignore next */
export default (initialState = {}) => {
  const logger = createLogger({})
  // const oidcMiddleware = createOidcMiddleware(oidcUserManager)
  const sagaMiddleware = createSagaMiddleware()

  // OidcLog.logger = console
  // OidcLog.level = OidcLog.INFO

  // ======================================================
  // Middleware Configuration
  // ======================================================
  // const middleware = [oidcMiddleware, sagaMiddleware]
  const middleware = [sagaMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
    middleware.push(logger)
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  /* istanbul ignore if */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  // load the current user into the redux store
  loadUser(store, oidcUserManager)

  // TODO not running saga in test mode due to oidcUserManager
  /* istanbul ignore if */
  if (!__TEST__) {
    sagaMiddleware.run(rootSaga)
  }

  return store
}
