// let config = {
//   apiRoot: 'http://aklwebnightly.services:9000',
//   oidcAuthorityUrl: 'https://aklwebnightly.services:8999',
//   oidcRedirectUrl: 'http://localhost:3000/callback'
// }

/* istanbul ignore next */
// ----------------------------------------------------------------------------
// #providerportal
// ----------------------------------------------------------------------------
let config = {
  apiRoot: 'http://claimsapi.nightly.nibnz.nibdom.com.au',
  oidcAuthorityUrl: 'https://auth.nightly.nibnz.nibdom.com.au:8999',
  oidcRedirectUrl: 'http://localhost:3000/providerportal/callback',
  silentRedirectUrl: 'http://localhost:3000/providerportal/callback-silent-renew'
}

// Octopus variable substitution expected for non-development
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'development') {
  config = {
    apiRoot: '#{apiRoot}',
    hostName: '#{HostName}',
    oidcAuthorityUrl: '#{oidcAuthorityUrl}',
    oidcRedirectUrl: '#{oidcRedirectUrl}',
    silentRedirectUrl: '#{silentRedirectUrl}',
    webApplicationName: '#{WebApplicationName}'
  }
}

export default config
