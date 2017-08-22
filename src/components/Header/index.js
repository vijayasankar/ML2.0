import Header from './Header'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const mapStateToProps = (state) => {
  const linksForUsers = Boolean(state.myProviders.currentProviderDetails.links) &&
    find(propEq('rel', 'list-provider-users'))(state.myProviders.currentProviderDetails.links)
  return {
    claimsHomeLinks: state.claimsHome.links,
    currentProviderDetails: state.myProviders.currentProviderDetails,
    isUserManagement: Boolean(linksForUsers),
    myProviders: state.myProviders.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
