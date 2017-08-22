import fetchMock from 'fetch-mock'
import defaultFn, * as R from 'utils/request'
import config from 'utils/env'

describe('(Store) request', () => {
  window.sessionStorage = {
    getItem: function (key) {
      return this[key]
    },
    setItem: function (key, value) {
      this[key] = value
    }
  }

  it('getTokenFromSessionStore should return null token by default', () => {
    const result = R.getTokenFromSessionStore()
    expect(result).to.be.undefined
  })

  it('getTokenFromSessionStore should return token set in sessionStorage', () => {
    const token = 'qwerty'
    const sessionTokenKey = 'oidc.user:' + config.oidcAuthorityUrl + ':nibProviderPortal'
    window.sessionStorage.setItem(sessionTokenKey, '{"access_token": "' + token + '"}')
    // console.log('RRR', window.sessionStorage.getItem(sessionTokenKey))
    const result = R.getTokenFromSessionStore()
    expect(result).to.equal(token)
  })

  it('apiRequest returning 204 with empty content', async () => {
    fetchMock.get('*', 204)
    const token = 'qwerty'
    const sessionTokenKey = 'oidc.user:' + config.oidcAuthorityUrl + ':nibProviderPortal'
    window.sessionStorage.setItem(sessionTokenKey, '{"access_token": "' + token + '"}')
    const result = await defaultFn()
    // console.log(result)
    expect(result.data).to.deep.equal({})
    fetchMock.restore()
  })

  it('apiRequest returning 200', async () => {
    fetchMock.get('*', {
      body: { hello: 'world' },
      status: 200
    })
    const token = 'qwerty'
    const sessionTokenKey = 'oidc.user:' + config.oidcAuthorityUrl + ':nibProviderPortal'
    window.sessionStorage.setItem(sessionTokenKey, '{"access_token": "' + token + '"}')
    const result = await defaultFn()
    // console.log(result)
    expect(result.data).to.deep.equal({ hello: 'world' })
    fetchMock.restore()
  })
})
