import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc'
import defaultFn, * as P from 'store/policiesHome'

describe('(Store) policiesHome', () => {
  it('loadPoliciesHomeStart should return action with type LOAD_POLICIES_HOME_START and no payload', () => {
    const payload = { a: 'b' }
    const result = P.loadPoliciesHomeStart(payload)
    expect(result.type).to.equal(P.LOAD_POLICIES_HOME_START)
    expect(result.payload).to.not.exist
  })

  it('loadPoliciesHomeSuccess should return action with type LOAD_POLICIES_HOME_SUCCESS', () => {
    const payload = { a: 'b' }
    const action = P.loadPoliciesHomeSuccess(payload)
    expect(action.type).to.equal(P.LOAD_POLICIES_HOME_SUCCESS)
    expect(action.payload).to.eql(payload)
    const newState = defaultFn(P.initialState, action)
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
