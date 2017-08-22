import * as actions from 'modules/actions'
import reducer from 'routes/RequestPayment/modules/PreApproval'

describe('(Module) RequestPayment/preApproval', () => {
  it('Reducer should be a function', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) RequestPayment/preApproval - state', () => {
  let input
  let initialState

  beforeEach(() => {
    initialState = {
      isValid: false,
      preApprovalNumber: '',
      dob: '',
      id: '',
      name: '',
      dateLodged: '',
      dateOfOnset: '',
      err: {
        preApprovalNumber: {
          isError: false,
          message: ''
        },
        dob: {
          isError: false,
          message: ''
        }
      }
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
    input = 'requestPayment'

    const action = actions.formReset(input)
    const prevState = { state: 'a' }
    const nextState = { ...initialState }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_PREAPPROVAL_SUCCESS sets isValid', () => {
    input = {
      dateLodged: '',
      dateOfOnset: '',
      dob: '',
      insuredPersonId: '',
      insuredPersonName: '',
      reference: '',
      proposedDateOfProcedure: ''
    }

    const action = actions.verifyPreApprovalSuccess(input)
    const prevState = { ...initialState, isValid: false, proposedDateOfProcedure: '' }
    const nextState = { ...prevState, isValid: true }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_PREAPPROVAL_SUCCESS sets dateLodged', () => {
    input = {
      dateLodged: 'a',
      dateOfOnset: '',
      dob: '',
      insuredPersonId: '',
      insuredPersonName: '',
      reference: '',
      proposedDateOfProcedure: ''
    }

    const action = actions.verifyPreApprovalSuccess(input)
    const prevState = { ...initialState, dateLodged: '', proposedDateOfProcedure: '', isValid: true }
    const nextState = { ...prevState, dateLodged: 'a' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_PREAPPROVAL_SUCCESS sets dateOfOnset', () => {
    input = {
      dateLodged: '',
      dateOfOnset: 'a',
      dob: '',
      insuredPersonId: '',
      insuredPersonName: '',
      reference: '',
      proposedDateOfProcedure: ''
    }

    const action = actions.verifyPreApprovalSuccess(input)
    const prevState = { ...initialState, dateOfOnset: '', proposedDateOfProcedure: '', isValid: true }
    const nextState = { ...prevState, dateOfOnset: 'a' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_PREAPPROVAL_SUCCESS sets dob', () => {
    input = {
      dateLodged: '',
      dateOfOnset: '',
      dob: 'a',
      insuredPersonId: '',
      insuredPersonName: '',
      reference: '',
      proposedDateOfProcedure: ''
    }

    const action = actions.verifyPreApprovalSuccess(input)
    const prevState = { ...initialState, dob: '', proposedDateOfProcedure: '', isValid: true }
    const nextState = { ...prevState, dob: 'a' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_PREAPPROVAL_SUCCESS sets id', () => {
    input = {
      dateLodged: '',
      dateOfOnset: '',
      dob: '',
      insuredPersonId: 'a',
      insuredPersonName: '',
      reference: '',
      proposedDateOfProcedure: ''
    }

    const action = actions.verifyPreApprovalSuccess(input)
    const prevState = { ...initialState, insuredPersonId: '', proposedDateOfProcedure: '', isValid: true }
    const nextState = { ...prevState, id: 'a' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_PREAPPROVAL_SUCCESS sets name', () => {
    input = {
      dateLodged: '',
      dateOfOnset: '',
      dob: '',
      insuredPersonId: '',
      insuredPersonName: 'a',
      reference: '',
      proposedDateOfProcedure: ''
    }

    const action = actions.verifyPreApprovalSuccess(input)
    const prevState = { ...initialState, insuredPersonName: '', proposedDateOfProcedure: '', isValid: true }
    const nextState = { ...prevState, name: 'a' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_PREAPPROVAL_SUCCESS sets preApprovalNumber', () => {
    input = {
      dateLodged: '',
      dateOfOnset: '',
      dob: '',
      insuredPersonId: '',
      insuredPersonName: '',
      reference: 'a',
      proposedDateOfProcedure: ''
    }

    const action = actions.verifyPreApprovalSuccess(input)
    const prevState = { ...initialState, referemce: '', proposedDateOfProcedure: '', isValid: true }
    const nextState = { ...prevState, preApprovalNumber: 'a' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_PREAPPROVAL_SUCCESS sets preApprovalNumber', () => {
    input = {
      dateLodged: '',
      dateOfOnset: '',
      dob: '',
      insuredPersonId: '',
      insuredPersonName: '',
      reference: '',
      proposedDateOfProcedure: 'a'
    }

    const action = actions.verifyPreApprovalSuccess(input)
    const prevState = { ...initialState, proposedDateOfProcedure: '', isValid: true }
    const nextState = { ...prevState, proposedDateOfProcedure: 'a' }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })
})
