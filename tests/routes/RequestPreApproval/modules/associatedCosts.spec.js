import * as actions from 'modules/actions'
import reducer from 'routes/RequestPreApproval/modules/associatedCosts'

describe('(Module) RequestPreApproval/associatedCosts', () => {
  it('Should have an initial state', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) RequestPreApproval/associatedCosts - state', () => {
  let initialState
  let input

  beforeEach(() => {
    initialState = {
      prosthesesOptions: [],
      totalCost: 0
    }

    input = {}
  })

  it('should have initialState', () => {
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
    input = 'requestPreApproval'

    const action = actions.formReset(input)
    const prevState = { state: 'a' }
    const nextState = { ...initialState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle SEARCH_PROSTHESES_SUCCESS without input', () => {
    const action = actions.searchProsthesesSuccess(input)
    const prevState = { state: 'a' }
    const nextState = { ...prevState, prosthesesOptions: undefined }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle SEARCH_PROSTHESES_SUCCESS with input sets prosthesesOptions', () => {
    input = {
      items: 'success!'
    }

    const action = actions.searchProsthesesSuccess(input)
    const prevState = { state: 'a' }
    const nextState = { ...prevState, prosthesesOptions: 'success!' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })
})
