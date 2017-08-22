import * as constants from 'modules/constants'

const initialState = {
  isValid: false,
  preApprovalNumber: '',
  dob: '',
  id: '',
  name: '',
  dateLodged: '',
  dateOfOnset: '',
  err: {
    preApprovalNumber: {
      isError: false,
      message: ''
    },
    dob: {
      isError: false,
      message: ''
    }
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.FORM_RESET:
      if (action.payload.section === 'requestPayment') {
        return initialState
      }
      return state
    case constants.VERIFY_PREAPPROVAL_SUCCESS:
      return {
        ...state,
        isValid: true,
        dateLodged: action.payload.dateLodged,
        dateOfOnset: action.payload.dateOfOnset,
        dob: action.payload.dob,
        id: action.payload.insuredPersonId,
        name: action.payload.insuredPersonName,
        preApprovalNumber: action.payload.reference,
        proposedDateOfProcedure: action.payload.proposedDateOfProcedure,
        err: {
          preApprovalNumber: {
            isError: false,
            message: ''
          },
          dob: {
            isError: false,
            message: ''
          }
        }
      }
    default:
      return state
  }
}
