import * as constants from 'modules/constants'
import {
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
} from 'modules/actions'

describe('(Module - Actions) createRequestPaymentDocumentBundleError', () => {
  it('should have CREATE_REQUEST_PAYMENT_DOC_BUNDLE_ERROR action', () => {
    expect(createRequestPaymentDocumentBundleError(new Error('Oh no'))).to.deep.equal({
      type: constants.CREATE_REQUEST_PAYMENT_DOC_BUNDLE_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) createRequestPaymentDocumentBundleSuccess', () => {
  it('should have CREATE_REQUEST_PAYMENT_DOC_BUNDLE_SUCCESS action', () => {
    expect(createRequestPaymentDocumentBundleSuccess({ a: 'a' })).to.deep.equal({
      type: constants.CREATE_REQUEST_PAYMENT_DOC_BUNDLE_SUCCESS,
      payload: {
        docBundle: { a: 'a' }
      }
    })
  })
})

describe('(Module - Actions) createRequestPreApprovalDocumentBundleError', () => {
  it('should have CREATE_REQUEST_PRE_APPROVAL_DOC_BUNDLE_ERROR action', () => {
    expect(createRequestPreApprovalDocumentBundleError(new Error('Oh no'))).to.deep.equal({
      type: constants.CREATE_REQUEST_PRE_APPROVAL_DOC_BUNDLE_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) createRequestPreApprovalDocumentBundleSuccess', () => {
  it('should have CREATE_REQUEST_PRE_APPROVAL_DOC_BUNDLE_SUCCESS action', () => {
    expect(createRequestPreApprovalDocumentBundleSuccess({ a: 'a' })).to.deep.equal({
      type: constants.CREATE_REQUEST_PRE_APPROVAL_DOC_BUNDLE_SUCCESS,
      payload: {
        docBundle: { a: 'a' }
      }
    })
  })
})

describe('(Module - Actions) formReset', () => {
  it('should have FORM_RESET action', () => {
    expect(formReset('abc')).to.deep.equal({
      type: constants.FORM_RESET,
      payload: {
        section: 'abc'
      }
    })
  })
})

describe('(Module - Actions) formSubmit', () => {
  it('should have FORM_SUBMIT action', () => {
    expect(formSubmit('abc')).to.deep.equal({
      type: constants.FORM_SUBMIT,
      payload: {
        section: 'abc'
      }
    })
  })
})

describe('(Module - Actions) formSubmitSuccess', () => {
  it('should have FORM_SUBMIT_SUCCESS action', () => {
    expect(formSubmitSuccess('abc')).to.deep.equal({
      type: constants.FORM_SUBMIT_SUCCESS,
      payload: {
        section: 'abc'
      }
    })
  })
})

describe('(Module - Actions) formSubmitError', () => {
  it('should have FORM_SUBMIT_ERROR action', () => {
    expect(formSubmitError('section', new Error('Oh no'))).to.deep.equal({
      type: constants.FORM_SUBMIT_ERROR,
      payload: {
        section: 'section',
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) hideAdditionalFormSection', () => {
  it('should have HIDE_ADDITIONAL_FORM_SECTION action', () => {
    expect(hideAdditionalFormSection('abc', 'xyz')).to.deep.equal({
      type: constants.HIDE_ADDITIONAL_FORM_SECTION,
      payload: {
        section: 'abc',
        additionalFormSection: 'xyz'
      }
    })
  })
})

describe('(Module - Actions) loadHomeLinksError', () => {
  it('should have LOAD_HOME_LINKS_ERROR action', () => {
    expect(loadHomeLinksError(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_HOME_LINKS_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) loadHomeLists', () => {
  it('should have LOAD_HOME_LISTS action', () => {
    expect(loadHomeLists(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_HOME_LISTS
    })
  })
})

describe('(Module - Actions) loadHomeListsError', () => {
  it('should have LOAD_HOME_LISTS_ERROR action', () => {
    expect(loadHomeListsError(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_HOME_LISTS_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) loadHomeListsSuccess', () => {
  it('should have LOAD_HOME_LISTS_SUCCESS action', () => {
    expect(loadHomeListsSuccess({ a: 'a' })).to.deep.equal({
      type: constants.LOAD_HOME_LISTS_SUCCESS,
      payload: { a: 'a' }
    })
  })
})

describe('(Module - Actions) loadMorePaymentsList', () => {
  it('should have LOAD_MORE_PAYMENTS_LIST action', () => {
    expect(loadMorePaymentsList('abc')).to.deep.equal({
      type: constants.LOAD_MORE_PAYMENTS_LIST,
      payload: {
        url: 'abc'
      }
    })
  })
})

describe('(Module - Actions) loadMorePaymentsList', () => {
  it('should have LOAD_MORE_PAYMENTS_LIST action', () => {
    expect(loadMorePaymentsList('abc')).to.deep.equal({
      type: constants.LOAD_MORE_PAYMENTS_LIST,
      payload: {
        url: 'abc'
      }
    })
  })
})

describe('(Module - Actions) loadMorePaymentsListError', () => {
  it('should have LOAD_MORE_PAYMENTS_LIST_ERROR action', () => {
    expect(loadMorePaymentsListError(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_MORE_PAYMENTS_LIST_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) loadMorePaymentsListSuccess', () => {
  it('should have LOAD_MORE_PAYMENTS_LIST_SUCCESS action', () => {
    expect(loadMorePaymentsListSuccess({ a: 'a' })).to.deep.equal({
      type: constants.LOAD_MORE_PAYMENTS_LIST_SUCCESS,
      payload: { a: 'a' }
    })
  })
})

describe('(Module - Actions) loadMorePreApprovalsList', () => {
  it('should have LOAD_MORE_PRE_APPROVALS_LIST action', () => {
    expect(loadMorePreApprovalsList('abc')).to.deep.equal({
      type: constants.LOAD_MORE_PRE_APPROVALS_LIST,
      payload: {
        url: 'abc'
      }
    })
  })
})

describe('(Module - Actions) loadMorePreApprovalsListError', () => {
  it('should have LOAD_MORE_PRE_APPROVALS_LIST_ERROR action', () => {
    expect(loadMorePreApprovalsListError(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_MORE_PRE_APPROVALS_LIST_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) loadMorePreApprovalsListSuccess', () => {
  it('should have LOAD_MORE_PRE_APPROVALS_LIST_SUCCESS action', () => {
    expect(loadMorePreApprovalsListSuccess({ a: 'a' })).to.deep.equal({
      type: constants.LOAD_MORE_PRE_APPROVALS_LIST_SUCCESS,
      payload: { a: 'a' }
    })
  })
})

describe('(Module - Actions) loadPaymentsList', () => {
  it('should have LOAD_PAYMENTS_LIST action with default payload', () => {
    expect(loadPaymentsList()).to.deep.equal({
      type: constants.LOAD_PAYMENTS_LIST,
      payload: {
        limit: 50,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PAYMENTS_LIST action with default payload', () => {
    expect(loadPaymentsList({})).to.deep.equal({
      type: constants.LOAD_PAYMENTS_LIST,
      payload: {
        limit: 50,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PAYMENTS_LIST action that accepts limit argument', () => {
    expect(loadPaymentsList({ limit: 100 })).to.deep.equal({
      type: constants.LOAD_PAYMENTS_LIST,
      payload: {
        limit: 100,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PAYMENTS_LIST action that accepts page argument', () => {
    expect(loadPaymentsList({ page: 100 })).to.deep.equal({
      type: constants.LOAD_PAYMENTS_LIST,
      payload: {
        limit: 50,
        page: 100,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PAYMENTS_LIST action that accepts sortBy argument', () => {
    expect(loadPaymentsList({ sortBy: 'abc' })).to.deep.equal({
      type: constants.LOAD_PAYMENTS_LIST,
      payload: {
        limit: 50,
        page: 1,
        sortBy: 'abc',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PAYMENTS_LIST action that accepts sortOrder argument', () => {
    expect(loadPaymentsList({ sortOrder: 'abc' })).to.deep.equal({
      type: constants.LOAD_PAYMENTS_LIST,
      payload: {
        limit: 50,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'abc'
      }
    })
  })
})

describe('(Module - Actions) loadPaymentsListError', () => {
  it('should have LOAD_PAYMENTS_LIST_ERROR action', () => {
    expect(loadPaymentsListError(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_PAYMENTS_LIST_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) loadPaymentsListSuccess', () => {
  it('should have LOAD_PAYMENTS_LIST_SUCCESS action', () => {
    expect(loadPaymentsListSuccess([{ a: 'a', b: 'b' }])).to.deep.equal({
      type: constants.LOAD_PAYMENTS_LIST_SUCCESS,
      payload: [{ a: 'a', b: 'b' }]
    })
  })
})

describe('(Module - Actions) loadPreApprovalsList', () => {
  it('should have LOAD_PRE_APPROVALS_LIST action with default payload', () => {
    expect(loadPreApprovalsList()).to.deep.equal({
      type: constants.LOAD_PRE_APPROVALS_LIST,
      payload: {
        limit: 50,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PRE_APPROVALS_LIST action with default payload', () => {
    expect(loadPreApprovalsList({})).to.deep.equal({
      type: constants.LOAD_PRE_APPROVALS_LIST,
      payload: {
        limit: 50,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PRE_APPROVALS_LIST action that accepts limit argument', () => {
    expect(loadPreApprovalsList({ limit: 100 })).to.deep.equal({
      type: constants.LOAD_PRE_APPROVALS_LIST,
      payload: {
        limit: 100,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PRE_APPROVALS_LIST action that accepts page argument', () => {
    expect(loadPreApprovalsList({ page: 100 })).to.deep.equal({
      type: constants.LOAD_PRE_APPROVALS_LIST,
      payload: {
        limit: 50,
        page: 100,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PRE_APPROVALS_LIST action that accepts sortBy argument', () => {
    expect(loadPreApprovalsList({ sortBy: 'abc' })).to.deep.equal({
      type: constants.LOAD_PRE_APPROVALS_LIST,
      payload: {
        limit: 50,
        page: 1,
        sortBy: 'abc',
        sortOrder: 'Descending'
      }
    })
  })
  it('should have LOAD_PRE_APPROVALS_LIST action that accepts sortOrder argument', () => {
    expect(loadPreApprovalsList({ sortOrder: 'abc' })).to.deep.equal({
      type: constants.LOAD_PRE_APPROVALS_LIST,
      payload: {
        limit: 50,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'abc'
      }
    })
  })
})

describe('(Module - Actions) loadPreApprovalsListError', () => {
  it('should have LOAD_PRE_APPROVALS_LIST_ERROR action', () => {
    expect(loadPreApprovalsListError(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_PRE_APPROVALS_LIST_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) loadPreApprovalsListSuccess', () => {
  it('should have LOAD_PRE_APPROVALS_LIST_SUCCESS action', () => {
    expect(loadPreApprovalsListSuccess([{ a: 'a', b: 'b' }])).to.deep.equal({
      type: constants.LOAD_PRE_APPROVALS_LIST_SUCCESS,
      payload: [{ a: 'a', b: 'b' }]
    })
  })
})

describe('(Module - Actions) loadRequestPaymentCostList', () => {
  it('should have LOAD_REQUEST_PAYMENT_COST_LIST action', () => {
    expect(loadRequestPaymentCostList()).to.deep.equal({
      type: constants.LOAD_REQUEST_PAYMENT_COST_LIST
    })
  })
})

describe('(Module - Actions) loadRequestPaymentCostListError', () => {
  it('should have LOAD_REQUEST_PAYMENT_COST_LIST_ERROR action', () => {
    expect(loadRequestPaymentCostListError(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_REQUEST_PAYMENT_COST_LIST_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) loadRequestPaymentCostListSuccess', () => {
  it('should have LOAD_REQUEST_PAYMENT_COST_LIST_SUCCESS action', () => {
    expect(loadRequestPaymentCostListSuccess('Hospital', [{ a: 'a', b: 'b' }])).to.deep.equal({
      type: constants.LOAD_REQUEST_PAYMENT_COST_LIST_SUCCESS,
      payload: {
        serviceType: 'Hospital',
        list: [{ a: 'a', b: 'b' }]
      }
    })
  })
})

describe('(Module - Actions) loadUserManagementRegisteredUsersList', () => {
  it('should have LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST action', () => {
    expect(loadUserManagementRegisteredUsersList()).to.deep.equal({
      type: constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST
    })
  })
})

describe('(Module - Actions) loadUserManagementRegisteredUsersListError', () => {
  it('should have LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_ERROR action', () => {
    expect(loadUserManagementRegisteredUsersListError(new Error('Oh no'))).to.deep.equal({
      type: constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) searchProstheses', () => {
  it('should have SEARCH_PROSTHESES action', () => {
    expect(searchProstheses('aaa')).to.deep.equal({
      type: constants.SEARCH_PROSTHESES,
      payload: {
        byString: 'aaa'
      }
    })
  })
})

describe('(Module - Actions) searchProsthesesError', () => {
  it('should have SEARCH_PROSTHESES_ERROR action', () => {
    expect(searchProsthesesError(new Error('Oh no'))).to.deep.equal({
      type: constants.SEARCH_PROSTHESES_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) searchProsthesesSuccess', () => {
  it('should have SEARCH_PROSTHESES_SUCCESS action', () => {
    expect(searchProsthesesSuccess('aaa')).to.deep.equal({
      type: constants.SEARCH_PROSTHESES_SUCCESS,
      payload: {
        prosthesesNames: 'aaa'
      }
    })
  })
})
  // searchTypeahead,
  // searchTypeaheadSuccess,

describe('(Module - Actions) searchTypeahead', () => {
  it('should have SEARCH_TYPEAHEAD action', () => {
    expect(searchTypeahead('aaa', 'bbb')).to.deep.equal({
      type: constants.SEARCH_TYPEAHEAD,
      payload: {
        section: 'aaa',
        query: 'bbb'
      }
    })
  })
})

describe('(Module - Actions) searchTypeaheadSuccess', () => {
  it('should have SEARCH_TYPEAHEAD_SUCCESS action', () => {
    expect(searchTypeaheadSuccess('aaa', 'bbb')).to.deep.equal({
      type: constants.SEARCH_TYPEAHEAD_SUCCESS,
      payload: {
        section: 'aaa',
        value: 'bbb'
      }
    })
  })
})

describe('(Module - Actions) loadUserManagementRegisteredUsersListSuccess', () => {
  it('should have LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_SUCCESS action', () => {
    expect(loadUserManagementRegisteredUsersListSuccess(
      [{ a: 'a' }, { b: 'b' }],
      [{ c: 'c' }, { d: 'd' }]
    )).to.deep.equal({
      type: constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST_SUCCESS,
      payload: {
        users: [{ a: 'a' }, { b: 'b' }],
        invitedUsers: [{ c: 'c' }, { d: 'd' }]
      }
    })
  })
})

describe('(Module - Actions) showAdditionalFormSection', () => {
  it('should have SHOW_ADDITIONAL_FORM_SECTION action', () => {
    expect(showAdditionalFormSection('verifyPolicy', 'policyUser')).to.deep.equal({
      type: constants.SHOW_ADDITIONAL_FORM_SECTION,
      payload: {
        section: 'verifyPolicy',
        additionalFormSection: 'policyUser'
      }
    })
    expect(showAdditionalFormSection('verifyPolicy', 'policyUserName')).to.deep.equal({
      type: constants.SHOW_ADDITIONAL_FORM_SECTION,
      payload: {
        section: 'verifyPolicy',
        additionalFormSection: 'policyUserName'
      }
    })
  })
})

describe('(Module - Actions) validateSection', () => {
  it('validateSection should have VALIDATE_SECTION action', () => {
    expect(validateSection('verifyPolicy', true)).to.deep.equal({
      type: constants.VALIDATE_SECTION,
      payload: {
        section: 'verifyPolicy',
        value: true
      }
    })
    expect(validateSection('procedureCost', false)).to.deep.equal({
      type: constants.VALIDATE_SECTION,
      payload: {
        section: 'procedureCost',
        value: false
      }
    })
  })
})

describe('(Module - Actions) verifyPolicyError', () => {
  it('should have VERIFY_POLICY_ERROR action', () => {
    expect(verifyPolicyError(new Error('Oh no'))).to.deep.equal({
      type: constants.VERIFY_POLICY_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})

describe('(Module - Actions) verifyPolicySuccess', () => {
  it('should have VERIFY_POLICY_FOR_MULTIPLE_USERS action for multiple persons', () => {
    const result = verifyPolicySuccess({ persons: [1, 2, 3], dob: '1970-01-01' })
    expect(result.type).to.equal(constants.VERIFY_POLICY_FOR_MULTIPLE_USERS)
    expect(result.payload.persons).to.eql([1, 2, 3])
    expect(result.payload.dob).to.not.exist
  })

  it('should have VERIFY_POLICY_FOR_ONE_USER action for 1 person', () => {
    const dob = '1970-01-01'
    const person = {
      firstName: 'FN',
      lastName: 'LN',
      personId: 'PEID',
      policyId: 'POID'
    }
    const result = verifyPolicySuccess({ persons: [person], dob: dob })
    expect(result.type).to.equal(constants.VERIFY_POLICY_FOR_ONE_USER)
    expect(result.payload).to.eql({
      firstName: person.firstName,
      lastName: person.lastName,
      personId: person.personId,
      policyId: person.policyId,
      dob
    })
  })

  it('should have VERIFY_POLICY_FOR_ONE_USER action for 1 person', () => {
    const dob = '1970-01-01'
    const person = {
      firstName: 'FN',
      lastName: 'LN',
      personId: 'PEID',
      policyId: 'POID'
    }
    const result = verifyPolicySuccess({ persons: [person], dob: dob })
    expect(result.type).to.equal(constants.VERIFY_POLICY_FOR_ONE_USER)
    expect(result.payload).to.eql({
      firstName: person.firstName,
      lastName: person.lastName,
      personId: person.personId,
      policyId: person.policyId,
      dob
    })
  })

  it('should return undefined for no person', () => {
    const result = verifyPolicySuccess({ persons: [], dob: '1970-01-01' })
    expect(result).to.not.exist
  })
})

describe('(Module - Actions) verifyPreApprovalError', () => {
  it('should have VERIFY_PREAPPROVAL_ERROR action', () => {
    expect(verifyPreApprovalError(new Error('Oh no'))).to.deep.equal({
      type: constants.VERIFY_PREAPPROVAL_ERROR,
      payload: {
        err: Error('Oh no')
      }
    })
  })
})


describe('(Module - Actions) verifyPreApprovalSuccess', () => {
  it('should have VERIFY_PREAPPROVAL_SUCCESS action', () => {
    expect(verifyPreApprovalSuccess({ a: 'a', b: 'b' })).to.deep.equal({
      type: constants.VERIFY_PREAPPROVAL_SUCCESS,
      payload: { a: 'a', b: 'b' }
    })
  })
})
