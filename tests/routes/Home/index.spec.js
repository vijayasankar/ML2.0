import * as actions from 'modules/actions'
import {
  mapDispatchToProps,
  mapStateToProps
} from 'routes/Home/index'

describe('(Route) Home', () => {
  let initialState
  let initialProp

  beforeEach(() => {
    initialState = {
      myProviders: {
        currentProvider: '',
        currentProviderDetails: ''
      },
      preApprovals: {
        list: []
      },
      payments: {
        list: []
      }
    }

    initialProp = {
      currentProvider: '',
      currentProviderDetails: '',
      paymentsList: [],
      preApprovalsList: []
    }
  })
  it('loads action dispatchers to props', () => {
    expect(Object.keys(mapDispatchToProps)).to.deep.equal([
      'loadHomeLists',
      'loadPaymentsList',
      'loadPreApprovalsList'
    ])
  })

  it('loads Redux state to props currentProvider', () => {
    const state = {
      ...initialState
    }
    state.myProviders.currentProvider = 'aaa'
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      currentProvider: 'aaa'
    })
  })

  it('loads Redux state to props currentProviderDetails', () => {
    const state = {
      ...initialState
    }
    state.myProviders.currentProviderDetails = 'bbb'
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      currentProviderDetails: 'bbb'
    })
  })

  it('loads Redux state to props paymentsList', () => {
    const state = {
      ...initialState
    }
    state.payments.list = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      paymentsList: ['aaa']
    })
  })

  it('loads Redux state to props preApprovalsList', () => {
    const state = {
      ...initialState
    }
    state.preApprovals.list = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      preApprovalsList: ['aaa']
    })
  })
})
