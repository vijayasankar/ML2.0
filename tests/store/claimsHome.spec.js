import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc'
import defaultFn, * as C from 'store/claimsHome'

describe('(Store) claimsHome', () => {
  it('loadClaimsHomeStart should return action with type LOAD_CLAIMS_HOME_START and no payload', () => {
    const payload = { a: 'b' }
    const result = C.loadClaimsHomeStart(payload)
    expect(result.type).to.equal(C.LOAD_CLAIMS_HOME_START)
    expect(result.payload).to.not.exist
  })

  it('loadClaimsHomeSuccess should return action with type LOAD_CLAIMS_HOME_SUCCESS', () => {
    const payload = { a: 'b' }
    const action = C.loadClaimsHomeSuccess(payload)
    expect(action.type).to.equal(C.LOAD_CLAIMS_HOME_SUCCESS)
    expect(action.payload).to.eql(payload)
    const newState = defaultFn(C.initialState, action)
    expect(newState).to.eql(payload)
  })

  it('oidc SESSION_TERMINATED should reduce state back to (empty) initialState', () => {
    const currentState = { a: 'b' }
    const action = { type: SESSION_TERMINATED, payload: { c: 'd' } }
    const newState = defaultFn(currentState, action)
    expect(newState).to.eql({})
  })

  it('oidc USER_EXPIRED should reduce state back to (empty) initialState', () => {
    const currentState = { a: 'b' }
    const action = { type: USER_EXPIRED, payload: { c: 'd' } }
    const newState = defaultFn(currentState, action)
    expect(newState).to.eql({})
  })
})
