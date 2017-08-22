import * as constants from 'modules/constants'

const initialState = {
  currentProviderServiceType: '',
  docBundle: {},
  isFetching: false,
  isValid: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.CREATE_REQUEST_PAYMENT_DOC_BUNDLE_SUCCESS:
      return {
        ...state,
        docBundle: action.payload.docBundle
      }
    case constants.FORM_RESET:
      if (action.payload.section === 'requestPayment') {
        return initialState
      }
      return state
    case constants.FORM_SUBMIT:
      if (action.payload.section === 'requestPayment') {
        return {
          ...state,
          isFetching: true,
          isValid: false
        }
      }
      return state
    case constants.FORM_SUBMIT_SUCCESS:
      if (action.payload.section === 'requestPayment') {
        return {
          ...state,
          isFetching: false,
          isValid: true
        }
      }
      return state
    case constants.FORM_SUBMIT_ERROR:
      if (action.payload.section === 'requestPayment') {
        return {
          ...state,
          isFetching: false,
          isValid: false
        }
      }
      return state
    default:
      return state
  }
}
