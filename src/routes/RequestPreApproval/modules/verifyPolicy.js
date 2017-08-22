import * as constants from 'modules/constants'

const initialState = {
  isValid: false,
  firstName: '',
  lastName: '',
  dob: '',
  policyId: '',
  err: {
    policyId: {
      isError: false,
      message: ''
    },
    dob: {
      isError: false,
      message: ''
    }
  },
  additionalFormSection: {
    policyUser: {
      isShowing: false,
      selected: -1,
      list: []
    },
    policyUserName: {
      isShowing: false
    }
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.FORM_RESET:
      if (action.payload.section === 'requestPreApproval') {
        return initialState
      }
      return state
    /* case constants.VERIFY_POLICY_ERROR:
      return {
        ...state,
        isValid: false,
        err: {
          ...state.err,
          policyId: {
            isError: true,
            // message: action.payload.error
            message: [
              'We were unable to verify the policy details.',
              'Please try again with a valid policy number or name, plus date of birth.'
            ].join(' ')
          },
          dob: {
            isError: true,
            message: ''
          }
        }
      } */
    case constants.VERIFY_POLICY_FOR_ONE_USER:
      return {
        ...state,
        isValid: true,
        dob: action.payload.dob,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        personId: action.payload.personId,
        policyId: action.payload.policyId,
        err: {
          policyId: {
            isError: false,
            message: ''
          },
          dob: {
            isError: false,
            message: ''
          }
        }
      }
    case constants.VERIFY_POLICY_FOR_MULTIPLE_USERS:
      return {
        ...state,
        isValid: false,
        err: {
          policyId: {
            isError: true,
            message: ''
          },
          dob: {
            isError: true,
            message: [
              'Please select the patient for whom we are requesting this pre-approval.'
            ].join(' ')
          }
        },
        additionalFormSection: {
          ...state.additionalFormSection,
          policyUser: {
            ...state.additionalFormSection.policyUser,
            isShowing: true,
            selected: 0,
            list: action.payload.persons
          }
        }
      }
    case constants.VALIDATE_SECTION:
      if (action.payload.section === 'verifyPolicy') {
        return {
          ...state,
          isValid: action.payload.value
        }
      }
      return state
    case constants.SHOW_ADDITIONAL_FORM_SECTION:
      if (action.payload.section === 'verifyPolicy') {
        if (action.payload.additionalFormSection === 'policyUserName') {
          return {
            ...state,
            additionalFormSection: {
              ...state.additionalFormSection,
              policyUser: {
                ...state.additionalFormSection.policyUser,
                isShowing: false
              },
              policyUserName: {
                ...state.additionalFormSection.policyUserName,
                isShowing: true
              }
            }
          }
        } else if (action.payload.additionalFormSection === 'policyUser') {
          return {
            ...state,
            additionalFormSection: {
              ...state.additionalFormSection,
              policyUser: {
                ...state.additionalFormSection.policyUser,
                isShowing: !state.additionalFormSection.policyUser.isShowing
              },
              policyUserName: {
                ...state.additionalFormSection.policyUserName,
                isShowing: false
              }
            }
          }
        }
      }
      return state
    case constants.HIDE_ADDITIONAL_FORM_SECTION:
      if (action.payload.section === 'verifyPolicy') {
        return {
          ...state,
          additionalFormSection: {
            ...state.additionalFormSection,
            policyUser: {
              ...state.additionalFormSection.policyUser,
              isShowing: false
            },
            policyUserName: {
              ...state.additionalFormSection.policyUserName,
              isShowing: false
            }
          }
        }
      }
      return state
    default:
      return state
  }
}
