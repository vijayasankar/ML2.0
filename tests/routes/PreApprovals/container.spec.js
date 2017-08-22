import * as actions from 'modules/actions'
import { mapDispatchToProps, mapStateToProps } from 'routes/PreApprovals/container'

describe('(Route) PreApprovals container', () => {
  let initialState
  let initialProp

  beforeEach(() => {
    initialState = {
      myProviders: {
        currentProviderDetails: {
          name: ''
        }
      },
      preApprovals: {
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
      'loadMorePreApprovalsList',
      'loadPreApprovalsList'
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
    state.preApprovals.isFetching = true
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      isFetching: true
    })
  })

  it('loads Redux state to props isListPagingNext', () => {
    const state = {
      ...initialState
    }
    state.preApprovals.links = []
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      isListPagingNext: false
    })
  })

  it('loads Redux state to props links', () => {
    const state = {
      ...initialState
    }
    state.preApprovals.links = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      links: ['aaa']
    })
  })

  it('loads Redux state to props list', () => {
    const state = {
      ...initialState
    }
    state.preApprovals.list = ['aaa']
    expect(mapStateToProps(state)).to.deep.equal({
      ...initialProp,
      list: ['aaa']
    })
  })
})
