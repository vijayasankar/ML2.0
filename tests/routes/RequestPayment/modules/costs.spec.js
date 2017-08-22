import * as actions from 'modules/actions'
import reducer from 'routes/RequestPayment/modules/costs'

describe('(Module) RequestPayment - costs', () => {
  it('Should exist', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) RequestPayment - state', () => {
  let input
  let list
  let initialState

  beforeEach(() => {
    input = {}
    initialState = {
      list: []
    }
    list = []
  })

  it('Should have an initial state', () => {
    const action = {}
    const prevState = { ...initialState }

    expect(reducer(undefined, action)).to.deep.equal(prevState)
  })

  it('should handle FORM_RESET without section', () => {
    const action = actions.formReset(input)
    const prevState = { state: 'a' }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_RESET with incorrect section', () => {
    input = 'incorrect'

    const action = actions.formReset(input)
    const prevState = { state: 'a' }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_RESET with correct section', () => {
    input = 'requestPayment'

    const action = actions.formReset(input)
    const prevState = { state: 'a' }
    const nextState = { ...initialState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_REQUEST_PAYMENT_COST_LIST_SUCCESS without list', () => {
    const action = actions.loadRequestPaymentCostListSuccess(input, undefined)
    const prevState = { ...initialState, list: undefined }
    const nextState = { ...prevState, list: undefined }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle LOAD_REQUEST_PAYMENT_COST_LIST_SUCCESS with list sets list', () => {
    input = ''
    list = ['list']

    const action = actions.loadRequestPaymentCostListSuccess(input, list)
    const prevState = { ...initialState, list: [] }
    const nextState = { ...prevState, list: ['list'] }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })
})
