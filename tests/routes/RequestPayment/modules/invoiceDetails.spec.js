import reducer from 'routes/RequestPayment/modules/invoiceDetails'
import * as actions from 'modules/actions'

describe('(Module) RequestPayment/invoiceDetails', () => {
  it('Should exist', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) RequestPayment/invoiceDetails - state', () => {
  let input
  let initialState

  beforeEach(() => {
    input = {}
    initialState = {}
  })

  it('Should have an initial state', () => {
    const action = {}
    const prevState = { ...initialState }

    expect(reducer(undefined, action)).to.deep.equal(prevState)
  })

  it('should handle FORM_RESET without section', () => {
    const action = actions.formReset(input)
    const prevState = { state : 'a' }
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
})
