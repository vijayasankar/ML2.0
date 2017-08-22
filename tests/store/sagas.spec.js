import * as S from 'store/sagas'
import * as actions from 'modules/actions'
import * as constants from 'modules/constants'
import * as router from 'react-router'
import apiRequest from 'utils/request'
import config from 'utils/env'
import oidcUserManager from 'utils/oidcUserManager'
import sagaHelper from 'redux-saga-testing'
import sinon from 'sinon'
import { all, call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { loadPoliciesHomeSuccess } from 'store/policiesHome'
import {
  loadClaimsHomeSuccess,
  LOAD_CLAIMS_HOME_START,
  LOAD_CLAIMS_HOME_SUCCESS
} from 'store/claimsHome'
import {
  LOAD_CURRENT_PROVIDER_SUCCESS,
  LOAD_MY_PROVIDERS_SUCCESS,
  SELECT_CURRENT_PROVIDER,
  loadCurrentProviderError,
  loadCurrentProviderSuccess,
  loadMyProvidersError,
  loadMyProvidersSuccess
} from 'store/myProviders'

// ----------------------------------------------------------------------------
// backHome
// ----------------------------------------------------------------------------

describe('(Saga) backHome', () => {
  const oldBrowserHistory = router.browserHistory
  after(() => { router.browserHistory = oldBrowserHistory })
  const gen = S.backHome()
  it('starts by initiating a browserHistory push method', () => {
    router.browserHistory = { push: () => {} }
  })
  it('then calls loadHomeLists generator function', () => {
    expect(gen.next().value).to.deep.equal(call(S.loadHomeLists))
  })
  it('then ends', () => {
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// backHomeSaga
// ----------------------------------------------------------------------------

describe('(Saga) backHomeSaga', () => {
  const gen = S.backHomeSaga()
  it(`
     listens to LOAD_CURRENT_PROVIDER_SUCCESS an
     calls backHome generator function as a callback
  `, () => {
    expect(gen.next().value).to.deep.equal(takeEvery('LOAD_CURRENT_PROVIDER_SUCCESS', S.backHome))
  })
  it('then ends', () => {
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// createRequestPaymentDocumentBundle
// ----------------------------------------------------------------------------

describe('(Saga) createRequestPaymentDocumentBundle', () => {
  const it = sagaHelper(S.createRequestPaymentDocumentBundle())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      claimsHome: {
        links: [{
          rel: 'create-claim-bundle',
          url: 'http://www.zzz.com',
          method: 'GET'
        }]
      }
    }
  })

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: 'abc'
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(actions.createRequestPaymentDocumentBundleSuccess('abc'))
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) createRequestPaymentDocumentBundle with missing link', () => {
  const it = sagaHelper(S.createRequestPaymentDocumentBundle())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      claimsHome: {
        links: []
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.createRequestPaymentDocumentBundleError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// createRequestPaymentDocumentBundleSaga
// ----------------------------------------------------------------------------

describe('(Saga) createRequestPaymentDocumentBundleSaga', () => {
  it('createRequestPaymentDocumentBundleSaga', () => {
    const gen = S.createRequestPaymentDocumentBundleSaga()
    expect(gen.next().value).to.deep.equal(takeEvery(
      constants.VERIFY_PREAPPROVAL_SUCCESS,
      S.createRequestPaymentDocumentBundle
    ))
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// createRequestPreApprovalDocumentBundle
// ----------------------------------------------------------------------------

describe('(Saga) createRequestPreApprovalDocumentBundle', () => {
  const it = sagaHelper(S.createRequestPreApprovalDocumentBundle())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      claimsHome: {
        links: [{
          rel: 'create-preapp-bundle',
          url: 'http://www.zzz.com',
          method: 'GET'
        }]
      }
    }
  })

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: 'abc'
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(actions.createRequestPreApprovalDocumentBundleSuccess('abc'))
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) createRequestPreApprovalDocumentBundle with missing link', () => {
  const it = sagaHelper(S.createRequestPreApprovalDocumentBundle())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      claimsHome: {
        links: []
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.createRequestPreApprovalDocumentBundleError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// createRequestPreApprovalDocumentBundleSaga
// ----------------------------------------------------------------------------

describe('(Saga) createRequestPreApprovalDocumentBundleSaga', () => {
  it('createRequestPreApprovalDocumentBundleSaga', () => {
    const gen = S.createRequestPreApprovalDocumentBundleSaga()
    expect(gen.next().value).to.deep.equal(takeEvery(
      constants.VERIFY_POLICY_FOR_ONE_USER,
      S.createRequestPreApprovalDocumentBundle
    ))
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadCurrentProvider
// ----------------------------------------------------------------------------

describe('(Saga) loadCurrentProvider', () => {
  const it = sagaHelper(S.loadCurrentProvider())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProvider: {
          links: [{
            rel: 'self',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: 'abc'
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(loadCurrentProviderSuccess('abc'))
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadCurrentProvider with missing link', () => {
  const it = sagaHelper(S.loadCurrentProvider())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProvider: {
          links: []
        }
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(loadCurrentProviderError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// loadCurrentProvider
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// loadCurrentProviderSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadCurrentProviderSaga', () => {
  it('loadCurrentProviderSaga', () => {
    const gen = S.loadCurrentProviderSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery(['SELECT_CURRENT_PROVIDER', 'LOAD_MY_PROVIDERS_SUCCESS'], S.loadCurrentProvider)
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadHomeLinks
// ----------------------------------------------------------------------------

describe('(Saga) loadHomeLinks', () => {
  const it = sagaHelper(S.loadHomeLinks())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(all([
      call(apiRequest, `${config.apiRoot}/home`),
      call(apiRequest, `${config.apiRoot}/policies/home`)
    ]))
    return [
      { data: 'aaa' },
      { data: 'bbb' }
    ]
  })

  it('then put an success action for loadClaimsHome', (result) => {
    expect(result).to.deep.equal(
      put(loadClaimsHomeSuccess('aaa'))
    )
  })

  it('then put an success action for loadPoliciesHome', (result) => {
    expect(result).to.deep.equal(
      put(loadPoliciesHomeSuccess('bbb'))
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadHomeLinks with incomplete /home link', () => {
  const it = sagaHelper(S.loadHomeLinks())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(all([
      call(apiRequest, `${config.apiRoot}/home`),
      call(apiRequest, `${config.apiRoot}/policies/home`)
    ]))
    return [
      { },
      { data: 'bbb' }
    ]
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadHomeLinksError(Error()))
    )
  })
})

describe('(Saga) loadHomeLinks with incomplete /policies/home link', () => {
  const it = sagaHelper(S.loadHomeLinks())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(all([
      call(apiRequest, `${config.apiRoot}/home`),
      call(apiRequest, `${config.apiRoot}/policies/home`)
    ]))
    return [
      { data: 'aaa' },
      { }
    ]
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadHomeLinksError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// loadHomeLinksSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadHomeLinksSaga', () => {
  it('loadHomeLinksSaga', () => {
    const gen = S.loadHomeLinksSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery('LOAD_CLAIMS_HOME_START', S.loadHomeLinks)
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadHomeLists
// ----------------------------------------------------------------------------

describe('(Saga) loadHomeLists', () => {
  const it = sagaHelper(S.loadHomeLists())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(all([
      call(S.loadPreApprovalsList, {
        payload: {
          limit: 6,
          page: 1,
          sortBy: 'DateLodged',
          sortOrder: 'Descending'
        }
      }),
      call(S.loadPaymentsList, {
        payload: {
          limit: 6,
          page: 1,
          sortBy: 'DateLodged',
          sortOrder: 'Descending'
        }
      })
    ]))
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

// ----------------------------------------------------------------------------
// loadHomeListsSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadHomeListsSaga', () => {
  it('loadHomeListsSaga', () => {
    const gen = S.loadHomeListsSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery('LOAD_HOME_LISTS', S.loadHomeLists)
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadMorePaymentsList
// ----------------------------------------------------------------------------

describe('(Saga) loadMorePaymentsList', () => {
  const it = sagaHelper(S.loadMorePaymentsList({
    payload: {
      url: 'http://www.zzz.com'
    }
  }))

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: 'abc'
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadMorePaymentsListSuccess('abc'))
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadMorePaymentsList with no results', () => {
  const it = sagaHelper(S.loadMorePaymentsList({
    payload: {
      url: 'http://www.zzz.com'
    }
  }))
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadMorePaymentsListError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// loadMorePaymentsListSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadMorePaymentsListSaga', () => {
  it('loadMorePaymentsListSaga', () => {
    const gen = S.loadMorePaymentsListSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery(constants.LOAD_MORE_PAYMENTS_LIST, S.loadMorePaymentsList)
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadMorePreApprovalsList
// ----------------------------------------------------------------------------

describe('(Saga) loadMorePreApprovalsList', () => {
  const it = sagaHelper(S.loadMorePreApprovalsList({
    payload: {
      url: 'http://www.zzz.com'
    }
  }))

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: 'abc'
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadMorePreApprovalsListSuccess('abc'))
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadMorePreApprovalsList with no results', () => {
  const it = sagaHelper(S.loadMorePreApprovalsList({
    payload: {
      url: 'http://www.zzz.com'
    }
  }))
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadMorePreApprovalsListError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// loadMorePreApprovalListSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadMorePreApprovalListSaga', () => {
  it('loadMorePreApprovalsListSaga', () => {
    const gen = S.loadMorePreApprovalsListSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery(constants.LOAD_MORE_PRE_APPROVALS_LIST, S.loadMorePreApprovalsList)
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadMyProviders
// ----------------------------------------------------------------------------

describe('(Saga) loadMyProviders', () => {
  const it = sagaHelper(S.loadMyProviders())

  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      claimsHome: {
        links: [{
          rel: 'my-providers',
          url: 'http://www.zzz.com',
          method: 'GET'
        }]
      }
    }
  })

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: 'abc'
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(loadMyProvidersSuccess('abc'))
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadMyProviders with no link', () => {
  const it = sagaHelper(S.loadMyProviders())

  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      claimsHome: {
        links: []
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(loadMyProvidersError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// loadMyProviderSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadMyProvidersSaga', () => {
  it('loadMyProvidersSaga', () => {
    const gen = S.loadMyProvidersSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery(LOAD_CLAIMS_HOME_SUCCESS, S.loadMyProviders)
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadPaymentsList
// ----------------------------------------------------------------------------

describe('(Saga) loadPaymentsList', () => {
  const it = sagaHelper(S.loadPaymentsList({
    payload: {
      limit: 5,
      page: 1,
      sortBy: 'aaa',
      sortOrder: 'abc'
    }
  }))

  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: [{
            rel: 'list-claims',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method for list', (result) => {
    expect(result).to.deep.equal(
      call(
        apiRequest,
        'http://www.zzz.com?limit=5&page=1&sortBy=aaa&sortOrder=abc',
        'GET'
      )
    )
    return {
      data: [{
        id: 0,
        value: 'aaa'
      },
      {
        id: 1,
        value: 'bbb'
      }]
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(
        actions.loadPaymentsListSuccess(
          [{
            id: 0,
            value: 'aaa'
          },
          {
            id: 1,
            value: 'bbb'
          }]
        )
      )
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadPaymentsList with no results', () => {
  const it = sagaHelper(S.loadPaymentsList({
    payload: {
      limit: 5,
      page: 1,
      sortBy: 'aaa',
      sortOrder: 'abc'
    }
  }))

  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: [{
            rel: 'list-claims',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method for list', (result) => {
    expect(result).to.deep.equal(
      call(
        apiRequest,
        'http://www.zzz.com?limit=5&page=1&sortBy=aaa&sortOrder=abc',
        'GET'
      )
    )
    return {}
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadPaymentsListError(Error()))
    )
  })
})

describe('(Saga) loadPaymentsList with missing links', () => {
  const it = sagaHelper(S.loadPaymentsList({
    payload: {
      limit: 5,
      page: 1,
      sortBy: 'aaa',
      sortOrder: 'abc'
    }
  }))
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: []
        }
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadPaymentsListError(Error()))
    )
  })
})

describe('(Saga) loadPaymentsListSaga', () => {
  it('loadPaymentsListSaga', () => {
    const gen = S.loadPaymentsListSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery(constants.LOAD_PAYMENTS_LIST, S.loadPaymentsList)
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadPreApprovalsListSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadPreApprovalsList', () => {
  const it = sagaHelper(S.loadPreApprovalsList({
    payload: {
      limit: 5,
      page: 1,
      sortBy: 'aaa',
      sortOrder: 'abc'
    }
  }))

  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: [{
            rel: 'list-provider-preapprovals',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method for list', (result) => {
    expect(result).to.deep.equal(
      call(
        apiRequest,
        'http://www.zzz.com?limit=5&page=1&sortBy=aaa&sortOrder=abc',
        'GET'
      )
    )
    return {
      data: [{
        id: 0,
        value: 'aaa'
      },
      {
        id: 1,
        value: 'bbb'
      }]
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(
        actions.loadPreApprovalsListSuccess(
          [{
            id: 0,
            value: 'aaa'
          },
          {
            id: 1,
            value: 'bbb'
          }]
        )
      )
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadPreApprovalsList with no results', () => {
  const it = sagaHelper(S.loadPreApprovalsList({
    payload: {
      limit: 5,
      page: 1,
      sortBy: 'aaa',
      sortOrder: 'abc'
    }
  }))

  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: [{
            rel: 'list-provider-preapprovals',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method for list', (result) => {
    expect(result).to.deep.equal(
      call(
        apiRequest,
        'http://www.zzz.com?limit=5&page=1&sortBy=aaa&sortOrder=abc',
        'GET'
      )
    )
    return {}
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadPreApprovalsListError(Error()))
    )
  })
})

describe('(Saga) loadPreApprovalsList with missing links', () => {
  const it = sagaHelper(S.loadPreApprovalsList({
    payload: {
      limit: 5,
      page: 1,
      sortBy: 'aaa',
      sortOrder: 'abc'
    }
  }))
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: []
        }
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadPreApprovalsListError(Error()))
    )
  })
})

describe('(Saga) loadPreApprovalsListSaga', () => {
  it('loadPreApprovalsListSaga', () => {
    const gen = S.loadPreApprovalsListSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery(constants.LOAD_PRE_APPROVALS_LIST, S.loadPreApprovalsList)
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadRequestPaymentCostList
// ----------------------------------------------------------------------------

describe('(Saga) loadRequestPaymentCostList', () => {
  const it = sagaHelper(S.loadRequestPaymentCostList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          serviceTypes: ['abc'],
          links: [{
            rel: 'list-provider-claim-cost-types',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method for list', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: {
        items: [{
          id: 0,
          value: 'aaa'
        },
        {
          id: 1,
          value: 'bbb'
        }]
      }
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(
        actions.loadRequestPaymentCostListSuccess(
          'abc',
          [{
            id: 0,
            value: 'aaa'
          },
          {
            id: 1,
            value: 'bbb'
          }]
        )
      )
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadRequestPaymentCostList with filtered list', () => {
  const it = sagaHelper(S.loadRequestPaymentCostList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          serviceTypes: ['abc'],
          links: [{
            rel: 'list-provider-claim-cost-types',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: {
        items: [{
          id: 4,
          value: 'aaa'
        },
        {
          id: 5,
          value: 'bbb'
        },
        {
          id: 6,
          value: 'ccc'
        }]
      }
    }
  })

  it('then put an success action with a filtered list', (result) => {
    expect(result).to.deep.equal(
      put(
        actions.loadRequestPaymentCostListSuccess(
          'abc',
          [{
            id: 4,
            value: 'aaa'
          },
          {
            id: 6,
            value: 'ccc'
          }]
        )
      )
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadRequestPaymentCostList with no data', () => {
  const it = sagaHelper(S.loadRequestPaymentCostList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          serviceTypes: ['abc'],
          links: [{
            rel: 'list-provider-claim-cost-types',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {}
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadRequestPaymentCostListError(Error()))
    )
  })
})

describe('(Saga) loadRequestPaymentCostList with empty data', () => {
  const it = sagaHelper(S.loadRequestPaymentCostList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          serviceTypes: ['abc'],
          links: [{
            rel: 'list-provider-claim-cost-types',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com', 'GET'))
    return {
      data: {}
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadRequestPaymentCostListError(Error()))
    )
  })
})

describe('(Saga) loadRequestPaymentCostList with missing links', () => {
  const it = sagaHelper(S.loadRequestPaymentCostList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: []
        }
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadRequestPaymentCostListError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// loadRequestPaymentCostListSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadRequestPaymentCostListSaga', () => {
  it('loadRequestPaymentCostListSaga', () => {
    const gen = S.loadRequestPaymentCostListSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery(
        constants.LOAD_REQUEST_PAYMENT_COST_LIST,
        S.loadRequestPaymentCostList
      )
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// loadUserManagementRegisteredUsersListSaga
// ----------------------------------------------------------------------------

describe('(Saga) loadUserManagementRegisteredUsersList', () => {
  const it = sagaHelper(S.loadUserManagementRegisteredUsersList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: [{
            rel: 'list-provider-invitations',
            url: 'http://www.invitations.com',
            method: 'GET'
          },
          {
            rel: 'list-provider-users',
            url: 'http://www.users.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method for invited users', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.users.com', 'GET'))
    return {
      data: {
        items: ['user1', 'user2']
      }
    }
  })

  it('then call apiRequest method for users', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.invitations.com', 'GET'))
    return {
      data: {
        items: ['invited-user1', 'invited-user2', 'invited-user3']
      }
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(
        actions.loadUserManagementRegisteredUsersListSuccess(
          [
            'user1',
            'user2'
          ],
          [
            'invited-user1',
            'invited-user2',
            'invited-user3'
          ]
        )
      )
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})

describe('(Saga) loadUserManagementRegisteredUsersList with empty data', () => {
  const it = sagaHelper(S.loadUserManagementRegisteredUsersList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: [{
            rel: 'list-provider-invitations',
            url: 'http://www.invitations.com',
            method: 'GET'
          },
          {
            rel: 'list-provider-users',
            url: 'http://www.users.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then call apiRequest method for invited users', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.users.com', 'GET'))
    return {
      data: {
      }
    }
  })

  it('then call apiRequest method for users', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.invitations.com', 'GET'))
    return {
      data: {
      }
    }
  })

  it('then put an success action', (result) => {
    expect(result).to.deep.equal(
      put(
        actions.loadUserManagementRegisteredUsersListSuccess(
          [],
          []
        )
      )
    )
  })

  it('then ends', (result) => {
    expect(result).to.not.exist
  })
})
describe('(Saga) loadUserManagementRegisteredUsersList with missing links', () => {
  const it = sagaHelper(S.loadUserManagementRegisteredUsersList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: []
        }
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadUserManagementRegisteredUsersListError(Error()))
    )
  })
})

describe("(Saga) loadUserManagementRegisteredUsersList with missing 'list-provider-users' link", () => {
  const it = sagaHelper(S.loadUserManagementRegisteredUsersList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: [{
            rel: 'list-provider-invitations',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadUserManagementRegisteredUsersListError(Error()))
    )
  })
})

describe("(Saga) loadUserManagementRegisteredUsersList with missing 'list-provider-invitations' link", () => {
  const it = sagaHelper(S.loadUserManagementRegisteredUsersList())
  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      myProviders: {
        currentProviderDetails: {
          links: [{
            rel: 'list-provider-users',
            url: 'http://www.zzz.com',
            method: 'GET'
          }]
        }
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.loadUserManagementRegisteredUsersListError(Error()))
    )
  })
})

describe('(Saga) loadUserManagementRegisteredUsersListSaga', () => {
  it('loadUserManagementRegisteredUsersListSaga', () => {
    const gen = S.loadUserManagementRegisteredUsersListSaga()
    expect(gen.next().value).to.deep.equal(
      takeEvery(
        constants.LOAD_USER_MANAGEMENT_REGISTERED_USER_LIST,
        S.loadUserManagementRegisteredUsersList
      )
    )
    expect(gen.next()).to.deep.equal({ done: true, value: undefined })
  })
})

// ----------------------------------------------------------------------------
// searchProsthesesSaga
// ----------------------------------------------------------------------------

describe('(Saga) searchProsthesesSaga', () => {
  const it = sagaHelper(S.searchProsthesesSaga())
  it('starts by listening for SEARCH_PROSTHESES action', (result) => {
    expect(result).to.deep.equal(take(constants.SEARCH_PROSTHESES))
    return {
      payload: {
        byString: 'aaa'
      }
    }
  })

  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      claimsHome: {
        links: [{
          rel: 'find-prostheses',
          url: 'http://www.zzz.com',
          method: 'GET'
        }]
      }
    }
  })

  it('then call apiRequest method', (result) => {
    expect(result).to.deep.equal(call(apiRequest, 'http://www.zzz.com?search=aaa', 'GET'))
    return {
      data: 'abc'
    }
  })

  it('then put an success action and start a new generated cycle', (result) => {
    expect(result).to.deep.equal(
      put(actions.searchProsthesesSuccess('abc'))
    )
  })
})

describe('(Saga) searchProsthesesSaga with missing link', () => {
  const it = sagaHelper(S.searchProsthesesSaga())
  it('starts by listening for SEARCH_PROSTHESES action', (result) => {
    expect(result).to.deep.equal(take(constants.SEARCH_PROSTHESES))
    return {
      payload: {
        byString: 'aaa'
      }
    }
  })

  it('starts by getting the redux state', (result) => {
    expect(result).to.deep.equal(select())
    return {
      claimsHome: {
        links: []
      }
    }
  })

  it('then ends', (result) => {
    expect(result).to.deep.equal(
      put(actions.searchProsthesesError(Error()))
    )
  })
})

// ----------------------------------------------------------------------------
// taskUserExpired
// ----------------------------------------------------------------------------

describe('taskUserExpired', () => {
  it('redirects user to sign-in', (done) => {
    const stub = sinon.stub(oidcUserManager, 'signinRedirect')
    expect(stub.callCount).to.equal(0)
    S.taskUserExpired()
    expect(stub.callCount).to.equal(1)
    done()
  })
})

// ----------------------------------------------------------------------------
// watchUserExpired
// ----------------------------------------------------------------------------

describe('(Saga) watchUserExpired', () => {
  const it = sagaHelper(S.watchUserExpired())
  it('take USER_EXPIRED', (result) => {
    expect(result).to.deep.equal(
      take('redux-oidc/USER_EXPIRED')
    )
  })

  it('then calls', (result) => {
    expect(result).to.deep.equal(
      call(S.taskUserExpired)
    )
  })
})
