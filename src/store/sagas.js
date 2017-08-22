import * as actions from 'modules/actions'
import * as constants from 'modules/constants'
import apiRequest from 'utils/request'
import config from 'utils/env'
import find from 'ramda/src/find'
import oidcUserManager from 'utils/oidcUserManager'
import propEq from 'ramda/src/propEq'
import { all, call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { checkObjectIsEmpty } from 'utils/helpers'
import { loadClaimsHomeSuccess, LOAD_CLAIMS_HOME_START, LOAD_CLAIMS_HOME_SUCCESS } from './claimsHome'
import { loadPoliciesHomeSuccess } from './policiesHome'
import {
  LOAD_CURRENT_PROVIDER_SUCCESS,
  LOAD_MY_PROVIDERS_SUCCESS,
  SELECT_CURRENT_PROVIDER,
  loadCurrentProviderError,
  loadCurrentProviderSuccess,
  loadMyProvidersError,
  loadMyProvidersSuccess
} from './myProviders'

// ----------------------------------------------------------------------------
// By Ken?
// ----------------------------------------------------------------------------
// TODO token
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// #providerportal
// ----------------------------------------------------------------------------
export function * backHome () {
  browserHistory.push('/providerportal/')
  yield call(loadHomeLists)
}

export function * backHomeSaga () {
  yield takeEvery(LOAD_CURRENT_PROVIDER_SUCCESS, backHome)
}

export function * createRequestPaymentDocumentBundle () {
  try {
    const state = yield select()
    const link = find(propEq('rel', 'create-claim-bundle'))(state.claimsHome.links)
    if (!link) throw new Error('API Link could not be found')
    let result = yield call(apiRequest, link.url, link.method)
    yield put(actions.createRequestPaymentDocumentBundleSuccess(result.data))
  } catch (err) {
    yield put(actions.createRequestPaymentDocumentBundleError(err))
  }
}

export function * createRequestPaymentDocumentBundleSaga () {
  yield takeEvery(
    constants.VERIFY_PREAPPROVAL_SUCCESS,
    createRequestPaymentDocumentBundle
  )
}

export function * createRequestPreApprovalDocumentBundle () {
  try {
    const state = yield select()
    const link = find(propEq('rel', 'create-preapp-bundle'))(state.claimsHome.links)
    if (!link) throw new Error('API Link could not be found')
    let result = yield call(apiRequest, link.url, link.method)
    yield put(actions.createRequestPreApprovalDocumentBundleSuccess(result.data))
  } catch (err) {
    yield put(actions.createRequestPreApprovalDocumentBundleError(err))
  }
}

export function * createRequestPreApprovalDocumentBundleSaga () {
  yield takeEvery(
    constants.VERIFY_POLICY_FOR_ONE_USER,
    createRequestPreApprovalDocumentBundle
  )
}

export function * loadCurrentProvider () {
  try {
    const state = yield select()
    const link = find(propEq('rel', 'self'))(state.myProviders.currentProvider.links)
    if (!link) throw new Error('API Link could not be found')
    let result = yield call(apiRequest, link.url, link.method)
    yield put(loadCurrentProviderSuccess(result.data))
  } catch (err) {
    yield put(loadCurrentProviderError(err))
  }
}

export function * loadCurrentProviderSaga () {
  yield takeEvery([SELECT_CURRENT_PROVIDER, LOAD_MY_PROVIDERS_SUCCESS], loadCurrentProvider)
}

export function * loadHomeLinks () {
  try {
    const [claimsHomeResult, policiesHomeResult] = yield all([
      call(apiRequest, `${config.apiRoot}/home`),
      call(apiRequest, `${config.apiRoot}/policies/home`)
    ])
    if (!(claimsHomeResult && claimsHomeResult.data)) {
      throw new Error('loadHomeLinksSaga: Not getting results back')
    }
    if (!(policiesHomeResult && policiesHomeResult.data)) {
      throw new Error('loadHomeLinksSaga: Not getting results back')
    }
    yield put(loadClaimsHomeSuccess(claimsHomeResult.data))
    yield put(loadPoliciesHomeSuccess(policiesHomeResult.data))
  } catch (err) {
    yield put(actions.loadHomeLinksError(err))
  }
}

export function * loadHomeLinksSaga () {
  yield takeEvery(LOAD_CLAIMS_HOME_START, loadHomeLinks)
}

export function * loadHomeLists () {
  yield all([
    call(loadPreApprovalsList, {
      payload: {
        limit: 6,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    }),
    call(loadPaymentsList, {
      payload: {
        limit: 6,
        page: 1,
        sortBy: 'DateLodged',
        sortOrder: 'Descending'
      }
    })
  ])
}

export function * loadHomeListsSaga () {
  yield takeEvery(constants.LOAD_HOME_LISTS, loadHomeLists)
}

export function * loadMorePaymentsList ({ payload: { url } }) {
  try {
    let result = yield call(apiRequest, url, 'GET')
    if (!(result && result.data)) {
      throw new Error('No results found')
    }
    yield put(actions.loadMorePaymentsListSuccess(result.data))
  } catch (err) {
    yield put(actions.loadMorePaymentsListError(err))
  }
}

export function * loadMorePaymentsListSaga () {
  yield takeEvery(constants.LOAD_MORE_PAYMENTS_LIST, loadMorePaymentsList)
}

export function * loadMorePreApprovalsList ({ payload: { url } }) {
  try {
    let result = yield call(apiRequest, url, 'GET')
    if (!(result && result.data)) {
      throw new Error('No results found')
    }
    yield put(actions.loadMorePreApprovalsListSuccess(result.data))
  } catch (err) {
    yield put(actions.loadMorePreApprovalsListError(err))
  }
}

export function * loadMorePreApprovalsListSaga () {
  yield takeEvery(constants.LOAD_MORE_PRE_APPROVALS_LIST, loadMorePreApprovalsList)
}

export function * loadMyProviders () {
  try {
    // TODO token
    const state = yield select()
    const link = find(propEq('rel', 'my-providers'))(state.claimsHome.links)
    if (!link) throw new Error('API Link could not be found')
    let result = yield call(apiRequest, link.url, link.method)
    yield put(loadMyProvidersSuccess(result.data))
  } catch (err) {
    yield put(loadMyProvidersError(err))
  }
}

export function * loadMyProvidersSaga () {
  yield takeEvery(LOAD_CLAIMS_HOME_SUCCESS, loadMyProviders)
}

export function * loadPaymentsList ({ payload: { limit, page, sortBy, sortOrder } }) {
  try {
    const state = yield select()
    const link = find(propEq('rel', 'list-claims'))(state.myProviders.currentProviderDetails.links)
    if (!link) throw new Error('API Link could not be found')
    const url = [
      `${link.url}?`,
      `limit=${limit}&`,
      `page=${page}&`,
      `sortBy=${sortBy}&`,
      `sortOrder=${sortOrder}`
    ].join('')
    let result = yield call(apiRequest, url, link.method)
    if (!(result && result.data)) {
      throw new Error('Not getting results back')
    }
    yield put(actions.loadPaymentsListSuccess(result.data))
  } catch (err) {
    yield put(actions.loadPaymentsListError(err))
  }
}

export function * loadPaymentsListSaga () {
  yield takeEvery(constants.LOAD_PAYMENTS_LIST, loadPaymentsList)
}

export function * loadPreApprovalsList ({ payload: { limit, page, sortBy, sortOrder } }) {
  try {
    const state = yield select()
    const link = find(propEq('rel', 'list-provider-preapprovals'))(state.myProviders.currentProviderDetails.links)
    if (!link) throw new Error('API Link could not be found')
    const url = [
      `${link.url}?`,
      `limit=${limit}&`,
      `page=${page}&`,
      `sortBy=${sortBy}&`,
      `sortOrder=${sortOrder}`
    ].join('')
    let result = yield call(apiRequest, url, link.method)
    if (!(result && result.data)) {
      throw new Error('Not getting results back')
    }
    yield put(actions.loadPreApprovalsListSuccess(result.data))
  } catch (err) {
    yield put(actions.loadPreApprovalsListError(err))
  }
}

export function * loadPreApprovalsListSaga () {
  yield takeEvery(constants.LOAD_PRE_APPROVALS_LIST, loadPreApprovalsList)
}

export function * loadRequestPaymentCostList () {
  try {
    const state = yield select()
    const otherCostBlacklist = [5] // [Prothesis cost]
    const serviceType = state.myProviders.currentProviderDetails.serviceTypes[0]
    if (!serviceType) { throw new Error('serviceType could not be found') }
    const link = find(propEq('rel', 'list-provider-claim-cost-types'))(state.myProviders.currentProviderDetails.links)
    let result = yield call(apiRequest, link.url, link.method)
    if (!(result && result.data)) {
      throw new Error('Not getting results back')
    }
    const filteredList = result.data.items.filter(item => {
      return otherCostBlacklist.indexOf(item.id) === -1
    })
    yield put(actions.loadRequestPaymentCostListSuccess(serviceType, filteredList))
  } catch (err) {
    yield put(actions.loadRequestPaymentCostListError(err))
  }
}

export function * loadRequestPaymentCostListSaga () {
  yield takeEvery(
    constants.LOAD_REQUEST_PAYMENT_COST_LIST,
    loadRequestPaymentCostList
  )
}

export function * loadUserManagementRegisteredUsersList () {
  try {
    const state = yield select()
    const linkForUsers = find(
      propEq('rel', 'list-provider-users')
    )(state.myProviders.currentProviderDetails.links)
    const linkForInvitedUsers = find(
      propEq('rel', 'list-provider-invitations')
    )(state.myProviders.currentProviderDetails.links)
    const urlForUsers = linkForUsers.url
    const urlForInvitedUsers = linkForInvitedUsers.url
    if (!urlForUsers) throw new Error('API Link for users could not be found')
    if (!urlForInvitedUsers) throw new Error('API Link for invited users could not be found')
    let invitedUsers = {}
    let users = {}
    users = yield call(apiRequest, urlForUsers, linkForUsers.method)
    invitedUsers = yield call(apiRequest, urlForInvitedUsers, linkForInvitedUsers.method)
    const listOfUsers = (
      !checkObjectIsEmpty(users) &&
      Boolean(users.data) &&
      users.data.items
    ) || []
    const listOfInvitedUsers = (
      !checkObjectIsEmpty(invitedUsers) &&
      Boolean(invitedUsers.data) &&
      invitedUsers.data.items
    ) || []
    yield put(
      actions.loadUserManagementRegisteredUsersListSuccess(
        listOfUsers,
        listOfInvitedUsers
      )
    )
  } catch (err) {
    yield put(actions.loadUserManagementRegisteredUsersListError(err))
  }
}

export function * loadUserManagementRegisteredUsersListSaga () {
  yield takeEvery(
    constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST,
    loadUserManagementRegisteredUsersList
  )
}

// ----------------------------------------------------------------------------
// TODO - See if can be migrated to Typeahead component
// ----------------------------------------------------------------------------

export function * searchProsthesesSaga () {
  while (true) {
    const params = yield take(constants.SEARCH_PROSTHESES)
    try {
      const state = yield select()
      // TODO - Rob to let us know once there is data at their end
      // const link = find(propEq('rel', 'find-provider-prostheses'))(state.myProviders.currentProviderDetails.links)
      const link = find(propEq('rel', 'find-prostheses'))(state.claimsHome.links)
      if (!link) throw new Error('API Link could not be found')
      const url = `${link.url}?search=${params.payload.byString}`
      let result = yield call(apiRequest, url, link.method)
      if (!(result && result.data)) {
        throw new Error('searchProsthesesSaga: Not getting results back')
      }
      yield put(actions.searchProsthesesSuccess(result.data))
    } catch (err) {
      yield put(actions.searchProsthesesError(err))
    }
  }
}

export function taskUserExpired () {
  oidcUserManager.signinRedirect()
}

export function * watchUserExpired () {
  while (true) {
    yield take('redux-oidc/USER_EXPIRED')
    yield call(taskUserExpired)
  }
}

/* istanbul ignore next */
export default function * rootSaga () {
  yield fork(backHomeSaga)
  yield fork(createRequestPaymentDocumentBundleSaga)
  yield fork(createRequestPreApprovalDocumentBundleSaga)
  yield fork(loadCurrentProviderSaga)
  yield fork(loadHomeLinksSaga)
  yield fork(loadHomeListsSaga)
  yield fork(loadMorePaymentsListSaga)
  yield fork(loadMorePreApprovalsListSaga)
  yield fork(loadMyProvidersSaga)
  yield fork(loadPaymentsListSaga)
  yield fork(loadPreApprovalsListSaga)
  yield fork(loadRequestPaymentCostListSaga)
  yield fork(loadUserManagementRegisteredUsersListSaga)
  yield fork(searchProsthesesSaga)
  yield fork(watchUserExpired)
}
