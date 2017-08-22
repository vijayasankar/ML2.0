import { connect } from 'react-redux'
import UserManagement from './components/index.js'
import {
  formReset,
  formSubmit,
  formSubmitError,
  formSubmitSuccess,
  loadUserManagementRegisteredUsersList
} from 'modules/actions'

export const mapDispatchToProps = {
  formReset,
  formSubmit,
  formSubmitError,
  formSubmitSuccess,
  loadUserManagementRegisteredUsersList
}

export const mapStateToProps = (state) => {
  return ({
    currentProviderLinks: state.myProviders.currentProviderDetails.links || '',
    currentProviderName: state.myProviders.currentProviderDetails.name || '',
    listOfInvitedUsers: state.userManagement.listOfInvitedUsers || '',
    listOfUsers: state.userManagement.listOfUsers || '',
    token: state.oidc.user.access_token || ''
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
