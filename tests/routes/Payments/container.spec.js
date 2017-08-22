import * as actions from 'modules/actions'
import { mapDispatchToProps, mapStateToProps } from 'routes/Payments/container'

describe('(Route) Payments container', () => {
  let initialState
  let initialProp

  beforeEach(() => {
    initialState = {
      myProviders: {
        currentProviderDetails: {
          name: ''
        }
      },
      payments: {
        isFetching: undefined,
        links: [],
        list: []
      }
    }

    initialProp = {
      currentProviderName: '',
      isFetching: undefined,
      isListPagingNext: false,
      links: [],
      list: []
    }
  })
  it('loads action dispatchers to props', () => {
    expect(Object.keys(mapDispatchToProps)).to.deep.equal([
      'loadMorePaymentsList',
      'loadPaymentsList'
    ])
  })

  it('loads Redux state to props currentProviderName', () => {
    const state = {
      ...initialState
    }
    state.myProviders.currentProviderDetails.name = 'aaa'
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      currentProviderName: 'aaa'
    })
  })

  it('loads Redux state to props isFetching', () => {
    const state = {
      ...initialState
    }
    state.payments.isFetching = true
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      isFetching: true
    })
  })

  it('loads Redux state to props isListPagingNext', () => {
    const state = {
      ...initialState
    }
    state.payments.links = []
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      isListPagingNext: false
    })
  })

  it('loads Redux state to props links', () => {
    const state = {
      ...initialState
    }
    state.payments.links = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      links: ['aaa']
    })
  })

  it('loads Redux state to props list', () => {
    const state = {
      ...initialState
    }
    state.payments.list = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      list: ['aaa']
    })
  })
})
