import config from './env'
import 'whatwg-fetch'

// TODO handle other methods with payloads
export default function apiRequest (url, method = 'GET', data = {}) {
  let token
  try {
    // TODO FIXME for some reason the oidc.user object is always null
    // token = store().getState().oidc.user.access_token

    // TODO this is just a hack to get things going
    const sessionTokenKey = 'oidc.user:' + config.oidcAuthorityUrl + ':nibProviderPortal'
    const storage = window.sessionStorage.getItem(sessionTokenKey)
    const storageJson = JSON.parse(storage)
    token = storageJson.access_token
  } catch (err) {
    console.debug('apiRequest not getting token:', err, url)
  }

  console.debug('token = ', { token })
  if (!token) {
    throw new Error('apiRequest: cannot find token')
  }

  let options = {}
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('X-NibNZ-Version', '1')
  headers.append('Authorization', `Bearer ${token}`)

  if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
    options = {
      method,
      headers
    }
  } else if (method.toUpperCase() === 'POST') {
    headers.append('Content-Type', 'application/json')
    // req.ContentType = "application/json"

    options = {
      method,
      headers,
      body: JSON.stringify(data)
    }
  }

  return fetch(url, options)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res
      } else {
        const error = new Error(res.statusText)
        error.res = res
        throw error
      }
    })
    .then((res) => res.text())
    .then((text) => text.length ? JSON.parse(text) : {})
    .then((data) => ({ data }))
}

export function getTokenFromSessionStore () {
  let token
  try {
    const sessionTokenKey = 'oidc.user:' + config.oidcAuthorityUrl + ':nibProviderPortal'
    const storage = window.sessionStorage.getItem(sessionTokenKey)
    const storageJson = JSON.parse(storage)
    token = storageJson.access_token
  } catch (err) {
    console.debug('getTokenFromSessionStore not getting token:', err)
  }
  return token
}
