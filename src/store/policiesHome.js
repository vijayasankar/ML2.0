import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_POLICIES_HOME_START = 'LOAD_POLICIES_HOME_START'
export const LOAD_POLICIES_HOME_SUCCESS = 'LOAD_POLICIES_HOME_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function loadPoliciesHomeStart () {
  return {
    type: LOAD_POLICIES_HOME_START
  }
}

export function loadPoliciesHomeSuccess (policiesHomeLinks) {
  return {
    type: LOAD_POLICIES_HOME_SUCCESS,
    payload: policiesHomeLinks
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function claimsHomeReducer (state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return Object.assign({}, { ...initialState })
    case LOAD_POLICIES_HOME_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
