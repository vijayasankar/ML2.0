import * as actions from 'modules/actions'
import reducer from 'routes/RequestPayment/modules'

describe('(Module) RequestPayment', () => {
  it('Should exist', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) RequestPayment - state', () => {
  let initialState
  let input

  beforeEach(() => {
    input = {}

    initialState = {
      currentProviderServiceType: '',
      docBundle: {},
      isFetching: false,
      isValid: false
    }
  })

  it('Should have an initial state', () => {
    const action = {}
    const prevState = { ...initialState }
    const nextState = { ...prevState }

    expect(reducer(undefined, action)).to.deep.equal(nextState)
  })

  it('should handle CREATE_REQUEST_PAYMENT_DOC_BUNDLE_SUCCESS without docBundle', () => {
    const action = actions.createRequestPaymentDocumentBundleSuccess(input)
    const prevState = { ...initialState }
    const nextState = { ...prevState, docBundle: {} }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle CREATE_REQUEST_PAYMENT_DOC_BUNDLE_SUCCESS with docBundle', () => {
    input = {
      value: 'aaa'
    }

    const action = actions.createRequestPaymentDocumentBundleSuccess(input)
    const prevState = { ...initialState }
    const nextState = { ...initialState, docBundle: { value: 'aaa' } }

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
    input = 'requestPayment'

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
    input = 'requestPayment'

    const action = actions.formSubmit(input)
    const prevState = { ...initialState, isFetching: false, isValid: false }
    const nextState = { ...prevState, isFetching: true }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT with correct section sets isValid', () => {
    input = 'requestPayment'

    const action = actions.formSubmit(input)
    const prevState = { ...initialState, isFetching: true, isValid: true }
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
    input = 'requestPayment'

    const action = actions.formSubmitSuccess(input)
    const prevState = { ...initialState, isFetching: true, isValid: true }
    const nextState = { ...prevState, isFetching: false, isValid: true }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_SUCCESS with correct section sets isValid', () => {
    input = 'requestPayment'

    const action = actions.formSubmitSuccess(input)
    const prevState = { ...initialState, isFetching: false, isValid: false }
    const nextState = { ...prevState, isFetching: false, isValid: true }

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
    input = 'requestPayment'

    const action = actions.formSubmitError(input, new Error('Oh no'))
    const prevState = { ...initialState, isFetching: true, isValid: false }
    const nextState = { ...prevState, isFetching: false }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_SUBMIT_ERROR with correct section sets isValid', () => {
    input = 'requestPayment'

    const action = actions.formSubmitError(input, new Error('Oh no'))
    const prevState = { ...initialState, isFetching: false, isValid: true }
    const nextState = { ...prevState, isValid: false }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })
})
