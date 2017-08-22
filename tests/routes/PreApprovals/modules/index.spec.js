import * as actions from 'modules/actions'
import * as location from 'store/location'
import reducer from 'routes/PreApprovals/modules'

describe('(Module) PreApprovals', () => {
  it('Reducer should be a function', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) PreApprovals - state', () => {
  let initialState
  let input

  beforeEach(() => {
    input = {
      items: [],
      links: [],
      pathname: undefined
    }

    initialState = {
      isFetching: false,
      links: [],
      list: []
    }
  })

  it('Should have an initial state', () => {
    const action = {}
    const result = reducer(undefined, action)
    expect(result).to.deep.equal(initialState)
  })

  it('should handle LOCATION_CHANGE action without pathname', () => {
    const action = location.locationChange(input)
    const prevState = { ...initialState }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOCATION_CHANGE action with incorrect pathname', () => {
    input.pathname = '/aaa'

    const action = location.locationChange(input)
    const prevState = { ...initialState }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOCATION_CHANGE action with correct pathname sets isFetching', () => {
    input.pathname = '/'

    const action = location.locationChange(input)
    const prevState = { ...initialState, isFetching: false }
    const nextState = { ...prevState, isFetching: true }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_PAYMENTS_LIST_SUCCESS with empty items and links', () => {
    const action = actions.loadPreApprovalsListSuccess(input)
    const prevState = { ...initialState }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_PAYMENTS_LIST_SUCCESS without items sets links', () => {
    input.links = ['links']

    const action = actions.loadPreApprovalsListSuccess(input)
    const prevState = { ...initialState, links: [] }
    const nextState = { ...prevState, links: ['links'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_PAYMENTS_LIST_SUCCESS without links sets items', () => {
    input.items = ['list']

    const action = actions.loadPreApprovalsListSuccess(input)
    const prevState = { ...initialState, list: [] }
    const nextState = { ...prevState, list: ['list'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_PAYMENTS_LIST_SUCCESS with items and links sets items and links', () => {
    input.items = ['list']
    input.links = ['links']

    const action = actions.loadPreApprovalsListSuccess(input)
    const prevState = { ...initialState, list: [], links: [] }
    const nextState = { ...prevState, list: ['list'], links: ['links'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_MORE_PAYMENTS_LIST_SUCCESS with empty list, items and links', () => {
    const action = actions.loadMorePreApprovalsListSuccess(input)
    const prevState = { ...initialState }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_MORE_PAYMENTS_LIST_SUCCESS with empty list', () => {
    input.items = ['list']
    input.links = ['links']

    const action = actions.loadMorePreApprovalsListSuccess(input)
    const prevState = { ...initialState }
    const nextState = { ...prevState, list: ['list'], links: ['links'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_MORE_PAYMENTS_LIST_SUCCESS with empty items sets links', () => {
    input.links = ['links']

    const action = actions.loadMorePreApprovalsListSuccess(input)
    const prevState = { ...initialState, list: ['initialList'], links: [] }
    const nextState = { ...prevState, links: ['links'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_MORE_PAMYNETS_LIST_SUCCESS with empty links sets items', () => {
    input.items = ['list']

    const action = actions.loadMorePreApprovalsListSuccess(input)
    const prevState = { ...initialState, list: ['initialList'] }
    const nextState = { ...prevState, list: ['initialList', 'list'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_MORE_PAMYNETS_LIST_SUCCESS with list, items and links sets items and links', () => {
    input.items = ['list']
    input.links = ['links']

    const action = actions.loadMorePreApprovalsListSuccess(input)
    const prevState = { ...initialState, list: ['initialList'], links: [] }
    const nextState = { ...prevState, list: ['initialList', 'list'], links: ['links'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })
})
