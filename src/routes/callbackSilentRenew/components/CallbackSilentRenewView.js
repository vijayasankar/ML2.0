import React from 'react'
import { connect } from 'react-redux'
import { processSilentRenew } from 'redux-oidc'

class CallbackSilentRenewView extends React.Component {
  componentDidMount (...args) {
    processSilentRenew()
  }

  render () {
    return (
      <div>
        Silent renew callback
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(CallbackSilentRenewView)
