import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { CallbackComponent } from 'redux-oidc'
import oidcUserManager from 'utils/oidcUserManager'

class CallbackView extends React.Component {

  // --------------------------------------------------------------------------
  // #providerportal
  // --------------------------------------------------------------------------
  successCallback = () => {
    console.log('successCallback')
    // browserHistory.push('/')
    browserHistory.push('/providerportal/')
  }

  // --------------------------------------------------------------------------
  // TODO where to?
  // --------------------------------------------------------------------------
  // #providerportal
  // --------------------------------------------------------------------------
  errorCallback = () => {
    console.error('errorCallback')
    // browserHistory.push('/')
    // browserHistory.push('/providerportal/')
  }

  render () {
    return (
      <CallbackComponent userManager={oidcUserManager}
        successCallback={this.successCallback} errorCallback={this.errorCallback}>
        <div>
          Redirecting...
        </div>
      </CallbackComponent>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(CallbackView)
