import { createUserManager } from 'redux-oidc'
import config from './env'

const userManagerConfig = {
  client_id: 'nibProviderPortal',
  redirect_uri: config.oidcRedirectUrl,
  response_type: 'token',
  scope: 'claims:api claims:provider policy:api policy:provider',
  authority: config.oidcAuthorityUrl,
  accessTokenExpiringNotificationTime: 480, /* TODO  this assumes token expires in 10 minutes */
  automaticSilentRenew: true,
  silent_redirect_uri: config.silentRedirectUrl, /* not needed if automaticSilentRenew = false */
  filterProtocolClaims: true,
  loadUserInfo: true
}

const oidcUserManager = createUserManager(userManagerConfig)

export default oidcUserManager
