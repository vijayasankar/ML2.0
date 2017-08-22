import * as constants from './constants'

const createRequestPaymentDocumentBundleError = (err) => ({
  type: constants.CREATE_REQUEST_PAYMENT_DOC_BUNDLE_ERROR,
  payload: {
    err
  }
})

const createRequestPaymentDocumentBundleSuccess = (docBundle) => ({
  type: constants.CREATE_REQUEST_PAYMENT_DOC_BUNDLE_SUCCESS,
  payload: {
    docBundle
  }
})

const createRequestPreApprovalDocumentBundleError = (err) => ({
  type: constants.CREATE_REQUEST_PRE_APPROVAL_DOC_BUNDLE_ERROR,
  payload: {
    err
  }
})

const createRequestPreApprovalDocumentBundleSuccess = (docBundle) => ({
  type: constants.CREATE_REQUEST_PRE_APPROVAL_DOC_BUNDLE_SUCCESS,
  payload: {
    docBundle
  }
})

const hideAdditionalFormSection = (section, additionalFormSection) => ({
  type: constants.HIDE_ADDITIONAL_FORM_SECTION,
  payload: {
    section,
    additionalFormSection
  }
})

const loadHomeLinksError = (err) => ({
  type: constants.LOAD_HOME_LINKS_ERROR,
  payload: {
    err
  }
})

const loadHomeLists = () => ({
  type: constants.LOAD_HOME_LISTS
})

const loadHomeListsError = (err) => ({
  type: constants.LOAD_HOME_LISTS_ERROR,
  payload: {
    err
  }
})

const loadHomeListsSuccess = (obj) => ({
  type: constants.LOAD_HOME_LISTS_SUCCESS,
  payload: obj
})

const formReset = (section) => ({
  type: constants.FORM_RESET,
  payload: {
    section
  }
})

const formSubmit = (section) => ({
  type: constants.FORM_SUBMIT,
  payload: {
    section
  }
})

const formSubmitError = (section, err) => ({
  type: constants.FORM_SUBMIT_ERROR,
  payload: {
    section,
    err
  }
})

const formSubmitSuccess = (section) => ({
  type: constants.FORM_SUBMIT_SUCCESS,
  payload: {
    section
  }
})

const loadMorePaymentsList = (url) => ({
  type: constants.LOAD_MORE_PAYMENTS_LIST,
  payload: {
    url
  }
})

const loadMorePaymentsListError = (err) => ({
  type: constants.LOAD_MORE_PAYMENTS_LIST_ERROR,
  payload: {
    err
  }
})

const loadMorePaymentsListSuccess = (obj) => ({
  type: constants.LOAD_MORE_PAYMENTS_LIST_SUCCESS,
  payload: obj
})

const loadMorePreApprovalsList = (url) => ({
  type: constants.LOAD_MORE_PRE_APPROVALS_LIST,
  payload: {
    url
  }
})

const loadMorePreApprovalsListError = (err) => ({
  type: constants.LOAD_MORE_PRE_APPROVALS_LIST_ERROR,
  payload: {
    err
  }
})

const loadMorePreApprovalsListSuccess = (obj) => ({
  type: constants.LOAD_MORE_PRE_APPROVALS_LIST_SUCCESS,
  payload: obj
})

const loadPaymentsList = ({
  limit = 50,
  page = 1,
  sortBy = 'DateLodged',
  sortOrder = 'Descending'
} = {
  limit: 50,
  page: 1,
  sortBy: 'DateLodged',
  sortOrder: 'Descending'
}) => ({
  type: constants.LOAD_PAYMENTS_LIST,
  payload: {
    limit,
    page,
    sortBy,
    sortOrder
  }
})

const loadPaymentsListError = (err) => ({
  type: constants.LOAD_PAYMENTS_LIST_ERROR,
  payload: {
    err
  }
})

const loadPaymentsListSuccess = (obj) => ({
  type: constants.LOAD_PAYMENTS_LIST_SUCCESS,
  payload: obj
})

const loadPreApprovalsList = ({
  limit = 50,
  page = 1,
  sortBy = 'DateLodged',
  sortOrder = 'Descending'
} = {
  limit: 50,
  page: 1,
  sortBy: 'DateLodged',
  sortOrder: 'Descending'
}) => ({
  type: constants.LOAD_PRE_APPROVALS_LIST,
  payload: {
    limit,
    page,
    sortBy,
    sortOrder
  }
})

const loadPreApprovalsListError = (err) => ({
  type: constants.LOAD_PRE_APPROVALS_LIST_ERROR,
  payload: {
    err
  }
})

const loadPreApprovalsListSuccess = (obj) => ({
  type: constants.LOAD_PRE_APPROVALS_LIST_SUCCESS,
  payload: obj
})

const loadRequestPaymentCostList = () => ({
  type: constants.LOAD_REQUEST_PAYMENT_COST_LIST
})

const loadRequestPaymentCostListError = (err) => ({
  type: constants.LOAD_REQUEST_PAYMENT_COST_LIST_ERROR,
  payload: {
    err
  }
})

const loadRequestPaymentCostListSuccess = (serviceType, list) => ({
  type: constants.LOAD_REQUEST_PAYMENT_COST_LIST_SUCCESS,
  payload: {
    serviceType,
    list
  }
})

const loadUserManagementRegisteredUsersList = () => ({
  type: constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST
})

const loadUserManagementRegisteredUsersListError = (err) => ({
  type: constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_ERROR,
  payload: {
    err
  }
})

const loadUserManagementRegisteredUsersListSuccess = (users, invitedUsers) => ({
  type: constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_SUCCESS,
  payload: {
    users,
    invitedUsers
  }
})

const showAdditionalFormSection = (section, additionalFormSection) => ({
  type: constants.SHOW_ADDITIONAL_FORM_SECTION,
  payload: {
    section,
    additionalFormSection
  }
})

const validateSection = (section, value) => ({
  type: constants.VALIDATE_SECTION,
  payload: {
    section,
    value
  }
})

const verifyPolicyError = (err) => ({
  type: constants.VERIFY_POLICY_ERROR,
  payload: {
    err
  }
})

const verifyPolicySuccess = ({ persons, dob }) => {
  console.log('CALLED')
  if (persons.length > 1) {
    return ({
      type: constants.VERIFY_POLICY_FOR_MULTIPLE_USERS,
      payload: {
        persons
      }
    })
  } else if (persons.length === 1) {
    return ({
      type: constants.VERIFY_POLICY_FOR_ONE_USER,
      payload: {
        firstName: persons[0].firstName,
        lastName: persons[0].lastName,
        personId: persons[0].personId,
        policyId: persons[0].policyId,
        dob
      }
    })
  } else {
    return undefined
  }
}

const verifyPreApprovalError = (err) => ({
  type: constants.VERIFY_PREAPPROVAL_ERROR,
  payload: {
    err
  }
})

const verifyPreApprovalSuccess = (data) => ({
  type: constants.VERIFY_PREAPPROVAL_SUCCESS,
  payload: data
})

const searchProstheses = (byString) => ({
  type: constants.SEARCH_PROSTHESES,
  payload: {
    byString
  }
})

const searchProsthesesError = (err) => ({
  type: constants.SEARCH_PROSTHESES_ERROR,
  payload: {
    err
  }
})

const searchProsthesesSuccess = (prosthesesNames) => ({
  type: constants.SEARCH_PROSTHESES_SUCCESS,
  payload: {
    prosthesesNames
  }
})

/* istanbul ignore next */
const searchTypeahead = (section, query) => ({
  type: constants.SEARCH_TYPEAHEAD,
  payload: {
    section,
    query
  }
})

/* istanbul ignore next */
const searchTypeaheadSuccess = (section, value) => ({
  type: constants.SEARCH_TYPEAHEAD_SUCCESS,
  payload: {
    section,
    value
  }
})

/* istanbul ignore next */
export {
  createRequestPaymentDocumentBundleError,
  createRequestPaymentDocumentBundleSuccess,
  createRequestPreApprovalDocumentBundleError,
  createRequestPreApprovalDocumentBundleSuccess,
  formReset,
  formSubmit,
  formSubmitError,
  formSubmitSuccess,
  hideAdditionalFormSection,
  loadHomeLinksError,
  loadHomeLists,
  loadHomeListsError,
  loadHomeListsSuccess,
  loadMorePaymentsList,
  loadMorePaymentsListError,
  loadMorePaymentsListSuccess,
  loadMorePreApprovalsList,
  loadMorePreApprovalsListError,
  loadMorePreApprovalsListSuccess,
  loadPaymentsList,
  loadPaymentsListError,
  loadPaymentsListSuccess,
  loadPreApprovalsList,
  loadPreApprovalsListError,
  loadPreApprovalsListSuccess,
  loadRequestPaymentCostList,
  loadRequestPaymentCostListError,
  loadRequestPaymentCostListSuccess,
  loadUserManagementRegisteredUsersList,
  loadUserManagementRegisteredUsersListError,
  loadUserManagementRegisteredUsersListSuccess,
  searchProstheses,
  searchProsthesesError,
  searchProsthesesSuccess,
  searchTypeahead,
  searchTypeaheadSuccess,
  showAdditionalFormSection,
  validateSection,
  verifyPolicyError,
  verifyPolicySuccess,
  verifyPreApprovalError,
  verifyPreApprovalSuccess
}
