import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { connect, Provider } from 'react-redux'
import { OidcProvider } from 'redux-oidc'
import oidcUserManager from 'utils/oidcUserManager'
import IdleMonitor from 'react-simple-idle-monitor'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props
    const MyIdleMonitor = connect()(IdleMonitor)

    return (
      <Provider store={store}>
        <OidcProvider store={store} userManager={oidcUserManager}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes} />
            <MyIdleMonitor
              reduxActionPrefix='IdleMonitor'
              timeout={60000} /* milliseconds */
            />
          </div>
        </OidcProvider>
      </Provider>
    )
  }
}

export default AppContainer
