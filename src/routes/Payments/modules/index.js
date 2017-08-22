import * as constants from 'modules/constants'

const initialState = {
  isFetching: false,
  links: [],
  list: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'LOCATION_CHANGE':
      if (action.payload.pathname === '/' || action.payload.pathname === '/providerportal/') {
        return {
          ...state,
          isFetching: true,
          links: [],
          list: []
        }
      }
      return state
    case constants.LOAD_PAYMENTS_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        links: action.payload.links,
        list: action.payload.items
      }
    case constants.LOAD_MORE_PAYMENTS_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        links: action.payload.links,
        list: [
          ...state.list,
          ...action.payload.items
        ]
      }
    default:
      return state
  }
}
