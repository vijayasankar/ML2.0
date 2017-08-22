import * as constants from 'modules/constants'

const initialState = {
  prosthesesOptions: [],
  totalCost: 0
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.FORM_RESET:
      if (action.payload.section === 'requestPreApproval') {
        return initialState
      }
      return state
    case constants.SEARCH_PROSTHESES_SUCCESS:
      console.log('===> SEARCH_PROSTHESES_SUCCESS', action.payload)
      return {
        ...state,
        prosthesesOptions: action.payload.prosthesesNames.items
      }

    default:
      return state
  }
}
