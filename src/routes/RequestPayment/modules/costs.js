import * as constants from 'modules/constants'

const initialState = {
  list: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.FORM_RESET:
      if (action.payload.section === 'requestPayment') {
        return initialState
      }
      return state
    case constants.LOAD_REQUEST_PAYMENT_COST_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.list
      }
    default:
      return state
  }
}
