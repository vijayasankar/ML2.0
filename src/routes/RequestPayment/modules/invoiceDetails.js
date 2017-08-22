import * as constants from 'modules/constants'

const initialState = {
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.FORM_RESET:
      if (action.payload.section === 'requestPayment') {
        return initialState
      }
      return state
    default:
      return state
  }
}
