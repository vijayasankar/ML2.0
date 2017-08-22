import defaultFn, * as P from 'store/myProviders'

describe('(Store) myProviders', () => {
  it('loadMyProvidersSuccess should return action with type LOAD_MY_PROVIDERS_SUCCESS', () => {
    const payload = { a: 'b' }
    const result = P.loadMyProvidersSuccess(payload)
    expect(result.type).to.equal(P.LOAD_MY_PROVIDERS_SUCCESS)
    expect(result.payload).to.eql(payload)
  })

  it('selectCurrentProvider should return action with type SELECT_CURRENT_PROVIDER', () => {
    const payload = { a: 'b' }
    const result = P.selectCurrentProvider(payload)
    expect(result.type).to.equal(P.SELECT_CURRENT_PROVIDER)
    expect(result.payload).to.eql(payload)
  })

  it('loadCurrentProviderSuccess should return action with type LOAD_CURRENT_PROVIDER_SUCCESS', () => {
    const payload = { a: 'b' }
    const result = P.loadCurrentProviderSuccess(payload)
    expect(result.type).to.equal(P.LOAD_CURRENT_PROVIDER_SUCCESS)
    expect(result.payload).to.eql(payload)
  })

  describe('reducers', () => {
    it('LOAD_MY_PROVIDERS_SUCCESS action should assign first item in the payload as currentProvider', () => {
      const payload = { items: [{ a: 'b' }, { c: 'd' }, { e: 'f' }] }
      const action = P.loadMyProvidersSuccess(payload)
      const newState = defaultFn(P.initialState, action)
      expect(newState.currentProvider).to.eql(payload.items[0])
    })

    it('SELECT_CURRENT_PROVIDER action should assign payload as currentProvider', () => {
      const payload = { a: 'b' }
      const action = P.selectCurrentProvider(payload)
      const newState = defaultFn(P.initialState, action)
      expect(newState.currentProvider).to.eql(payload)
    })

    it('LOAD_CURRENT_PROVIDER_SUCCESS action should assign payload as currentProviderDetails', () => {
      const payload = { a: 'b' }
      const action = P.loadCurrentProviderSuccess(payload)
      const newState = defaultFn(P.initialState, action)
      expect(newState.currentProviderDetails).to.eql(payload)
    })
  })
})
