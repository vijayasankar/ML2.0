// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_CURRENT_PROVIDER_ERROR = 'LOAD_CURRENT_PROVIDER_ERROR'
export const LOAD_CURRENT_PROVIDER_SUCCESS = 'LOAD_CURRENT_PROVIDER_SUCCESS'
export const LOAD_MY_PROVIDERS_ERROR = 'LOAD_MY_PROVIDERS_ERROR'
export const LOAD_MY_PROVIDERS_SUCCESS = 'LOAD_MY_PROVIDERS_SUCCESS'
export const SELECT_CURRENT_PROVIDER = 'SELECT_CURRENT_PROVIDER'

// ------------------------------------
// Actions
// ------------------------------------
export const loadCurrentProviderError = (err) => {
  return {
    type: LOAD_CURRENT_PROVIDER_ERROR,
    payload: err
  }
}

export const loadCurrentProviderSuccess = (matchedProvider) => {
  return {
    type: LOAD_CURRENT_PROVIDER_SUCCESS,
    payload: matchedProvider
  }
}

export const loadMyProvidersError = (err) => {
  return {
    type: LOAD_MY_PROVIDERS_ERROR,
    payload: err
  }
}

export const loadMyProvidersSuccess = (myProviders) => {
  return {
    type: LOAD_MY_PROVIDERS_SUCCESS,
    payload: myProviders
  }
}

export const selectCurrentProvider = (currentProvider) => {
  return {
    type: SELECT_CURRENT_PROVIDER,
    payload: currentProvider
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentProvider: {},
  currentProviderDetails: {}
}

export default function myProvidersReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_MY_PROVIDERS_SUCCESS:
      return Object.assign({}, { ...state }, { ...action.payload }, {
        currentProvider: action.payload.items[0]
      })
    case SELECT_CURRENT_PROVIDER:
      return Object.assign({}, { ...state }, {
        currentProvider: action.payload
      })
    case LOAD_CURRENT_PROVIDER_SUCCESS:
      /* TODO having details nested could be tidier */
      // const newState = Object.assign({}, {
      //   ...state,
      //   currentProvider: {
      //     ...state.currentProvider,
      //     details: { ...action.payload }
      //   }
      // })
      // return newState
      return Object.assign({}, { ...state }, {
        currentProviderDetails: action.payload
      })

    default:
      return state
  }
}
