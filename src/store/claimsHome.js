import { SESSION_TERMINATED, USER_EXPIRED } from 'redux-oidc'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_CLAIMS_HOME_START = 'LOAD_CLAIMS_HOME_START'
export const LOAD_CLAIMS_HOME_SUCCESS = 'LOAD_CLAIMS_HOME_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function loadClaimsHomeStart () {
  return {
    type: LOAD_CLAIMS_HOME_START
  }
}

export function loadClaimsHomeSuccess (claimsHomeLinks) {
  return {
    type: LOAD_CLAIMS_HOME_SUCCESS,
    payload: claimsHomeLinks
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function claimsHomeReducer (state = initialState, action) {
  switch (action.type) {
    case SESSION_TERMINATED:
    case USER_EXPIRED:
      return initialState
    case LOAD_CLAIMS_HOME_SUCCESS:
      return Object.assign({}, { ...state }, { ...action.payload })
    default:
      return state
  }
}
