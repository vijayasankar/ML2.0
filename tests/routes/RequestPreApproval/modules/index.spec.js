// import * as constants from 'modules/constants'
import * as actions from 'modules/actions'
import reducer from 'routes/RequestPreApproval/modules'

describe('(Module) RequestPreApproval', () => {
  it('Should have an initial state', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) RequestPreApproval - state', () => {
  let initialState
  let input

  beforeEach(() => {
    initialState = {
      docBundle: {},
      isFetching: false,
      isValid: false
    }

    input = {}
  })

  it('should have initialState', () => {
    const action = {}
    const prevState = { ...initialState }
    const nextState = { ...prevState }

    expect(reducer(undefined, action)).to.deep.equal(nextState)
  })

  it('should handle CREATE_REQUEST_PRE_APPROVAL_DOC_BUNDLE_SUCCESS sets docBundle', () => {
    input = 'a'

    const action = actions.createRequestPreApprovalDocumentBundleSuccess(input)
    const prevState = { state: 'a', docBundle: '' }
    const nextState = { ...prevState, docBundle: 'a' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
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

  it('should handle FORM_SUBMIT without section', () => {
    const action = actions.formSubmit(input)
    const prevState = { state: 'a' }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT with incorrect section', () => {
    input = 'incorrect'

    const action = actions.formSubmit(input)
    const prevState = { state: 'a' }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT with correct section sets isFetching', () => {
    input = 'requestPreApproval'

    const action = actions.formSubmit(input)
    const prevState = { state: 'a', isFetching: false, isValid: false }
    const nextState = { ...prevState, isFetching: true }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT with correct section sets isValid', () => {
    input = 'requestPreApproval'

    const action = actions.formSubmit(input)
    const prevState = { state: 'a', isFetching: true, isValid: true }
    const nextState = { ...prevState, isValid: false }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_SUCCESS without section', () => {
    const action = actions.formSubmitSuccess(input)
    const prevState = { state: 'a' }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_SUCCESS with incorrect section', () => {
    input = 'incorrect'

    const action = actions.formSubmitSuccess(input)
    const prevState = { state: 'a' }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_SUCCESS with correct section sets isFetching', () => {
    input = 'requestPreApproval'

    const action = actions.formSubmitSuccess(input)
    const prevState = { state: 'a', isFetching: true, isValid: true }
    const nextState = { ...prevState, isFetching: false }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_SUCCESS with correct section sets isValid', () => {
    input = 'requestPreApproval'

    const action = actions.formSubmitSuccess(input)
    const prevState = { state: 'a', isFetching: false, isValid: false }
    const nextState = { ...prevState, isValid: true }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_ERROR without section', () => {
    const action = actions.formSubmitError(input, new Error('Oh no'))
    const prevState = { state: 'a' }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_ERROR with incorrect section', () => {
    input = 'incorrect'

    const action = actions.formSubmitError(input, new Error('Oh no'))
    const prevState = { state: 'a' }
    const nextState = { ...prevState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_ERROR with correct section sets isFetching', () => {
    input = 'requestPreApproval'

    const action = actions.formSubmitError(input, new Error('Oh no'))
    const prevState = { state: 'a', isFetching: true, isValid: false }
    const nextState = { ...prevState, isFetching: false }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_ERROR with correct section sets isValid', () => {
    input = 'requestPreApproval'

    const action = actions.formSubmitError(input, new Error('Oh no'))
    const prevState = { state: 'a', isFetching: false, isValid: true }
    const nextState = { ...prevState, isValid: false }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })
})
