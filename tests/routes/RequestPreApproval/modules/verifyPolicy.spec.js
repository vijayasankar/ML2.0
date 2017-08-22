import * as constants from 'modules/constants'
import * as actions from 'modules/actions'
import reducer from 'routes/RequestPreApproval/modules/verifyPolicy'

describe('(Module) RequestPreApproval/verifyPolicy', () => {
  it('Should have an initial state', () => {
    expect(typeof reducer).to.equal('function')
  })
})

describe('(Module) RequestPreApproval/verifyPolicy - state', () => {
  let initialState
  let input

  beforeEach(() => {
    initialState = {
      isValid: false,
      firstName: '',
      lastName: '',
      dob: '',
      policyId: '',
      err: {
        policyId: {
          isError: false,
          message: ''
        },
        dob: {
          isError: false,
          message: ''
        }
      },
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          list: [],
          selected: -1
        },
        policyUserName: {
          isShowing: false
        }
      }
    }

    input = {}
  })

  it('should have initialState', () => {
    const action = {}
    const prevState = { ...initialState
    }

    expect(reducer(undefined, action)).to.deep.equal(prevState)
  })

  it('should handle FORM_RESET without section', () => {
    const action = actions.formReset(input)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_RESET with incorrect section', () => {
    input = 'incorrect'

    const action = actions.formReset(input)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle FORM_RESET with correct section', () => {
    input = 'requestPreApproval'

    const action = actions.formReset(input)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...initialState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_ONE_USER sets isValid', () => {
    input = {
      firstName: '',
      lastName: '',
      personId: '',
      policyId: ''
    }
    const dob = ''

    const action = actions.verifyPolicySuccess({
      persons: [input],
      dob
    })
    const prevState = { ...initialState,
      personId: '',
      isValid: false
    }
    const nextState = { ...prevState,
      isValid: true
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_ONE_USER sets firstName', () => {
    input = {
      firstName: 'a',
      lastName: '',
      personId: '',
      policyId: ''
    }
    const dob = ''

    const action = actions.verifyPolicySuccess({
      persons: [input],
      dob
    })
    const prevState = { ...initialState,
      personId: '',
      isValid: true
    }
    const nextState = { ...prevState,
      firstName: 'a'
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_ONE_USER sets lastName', () => {
    input = {
      firstName: '',
      lastName: 'a',
      personId: '',
      policyId: ''
    }
    const dob = ''

    const action = actions.verifyPolicySuccess({
      persons: [input],
      dob
    })
    const prevState = { ...initialState,
      personId: '',
      isValid: true
    }
    const nextState = { ...prevState,
      lastName: 'a'
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_ONE_USER sets personId', () => {
    input = {
      firstName: '',
      lastName: '',
      personId: 'a',
      policyId: ''
    }
    const dob = ''

    const action = actions.verifyPolicySuccess({
      persons: [input],
      dob
    })
    const prevState = { ...initialState,
      personId: '',
      isValid: true
    }
    const nextState = { ...prevState,
      personId: 'a'
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_ONE_USER sets policyId', () => {
    input = {
      firstName: '',
      lastName: '',
      personId: '',
      policyId: 'a'
    }
    const dob = ''

    const action = actions.verifyPolicySuccess({
      persons: [input],
      dob
    })
    const prevState = { ...initialState,
      personId: '',
      isValid: true
    }
    const nextState = { ...prevState,
      policyId: 'a'
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_ONE_USER sets dob', () => {
    input = {
      firstName: '',
      lastName: '',
      personId: '',
      policyId: ''
    }
    const dob = 'a'

    const action = actions.verifyPolicySuccess({
      persons: [input],
      dob
    })
    const prevState = { ...initialState,
      personId: '',
      isValid: true
    }
    const nextState = { ...prevState,
      dob: 'a'
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  // TODO: VERIFY_POLICY_FOR_MULTIPLE_USERS

  it('should handle VERIFY_POLICY_FOR_MULTIPLE_USERS with multiple persons', () => {
    input = [1, 2, 3]
    const action = actions.verifyPolicySuccess({
      persons: input,
      dob: ''
    })
    const prevState = { ...initialState,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      },
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_MULTIPLE_USERS with multiple persons sets isValid', () => {
    input = [1, 2, 3]
    const action = actions.verifyPolicySuccess({
      persons: input,
      dob: ''
    })
    const prevState = { ...initialState,
      isValid: true,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      },
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }
    const nextState = { ...prevState,
      isValid: false
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_MULTIPLE_USERS with multiple persons sets policyId/isError', () => {
    input = [1, 2, 3]
    const action = actions.verifyPolicySuccess({
      persons: input,
      dob: ''
    })
    const prevState = { ...initialState,
      isValid: false,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      },
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: false,
          message: ''
        }
      }
    }
    const nextState = { ...prevState,
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_MULTIPLE_USERS with multiple persons sets dob/isError', () => {
    input = [1, 2, 3]
    const action = actions.verifyPolicySuccess({
      persons: input,
      dob: ''
    })
    const prevState = { ...initialState,
      isValid: false,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      },
      err: {
        dob: {
          isError: false,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }
    const nextState = { ...prevState,
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_MULTIPLE_USERS with multiple persons sets dob/message', () => {
    input = [1, 2, 3]
    const action = actions.verifyPolicySuccess({
      persons: input,
      dob: ''
    })
    const prevState = { ...initialState,
      isValid: false,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      },
      err: {
        dob: {
          isError: true,
          message: ''
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }
    const nextState = { ...prevState,
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_MULTIPLE_USERS with multiple persons sets policyUser/isShowing', () => {
    input = [1, 2, 3]
    const action = actions.verifyPolicySuccess({
      persons: input,
      dob: ''
    })
    const prevState = { ...initialState,
      isValid: false,
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      },
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }
    const nextState = { ...prevState,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_MULTIPLE_USERS with multiple persons sets policyUser/selected', () => {
    input = [1, 2, 3]
    const action = actions.verifyPolicySuccess({
      persons: input,
      dob: ''
    })
    const prevState = { ...initialState,
      isValid: false,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: -1
        },
        policyUserName: {
          isShowing: false
        }
      },
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }
    const nextState = { ...prevState,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VERIFY_POLICY_FOR_MULTIPLE_USERS with multiple persons sets policyUser/list', () => {
    input = [1, 2, 3]
    const action = actions.verifyPolicySuccess({
      persons: input,
      dob: ''
    })
    const prevState = { ...initialState,
      isValid: false,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: [],
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      },
      err: {
        dob: {
          isError: true,
          message: 'Please select the patient for whom we are requesting this pre-approval.'
        },
        policyId: {
          isError: true,
          message: ''
        }
      }
    }
    const nextState = { ...prevState,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: input,
          selected: 0
        },
        policyUserName: {
          isShowing: false
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VALIDATE_SECTION without section', () => {
    const action = actions.validateSection(input, undefined)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VALIDATE_SECTION with incorrect section', () => {
    input = 'incorrect'

    const action = actions.validateSection(input, undefined)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle VALIDATE_SECTION with correct section sets isValid', () => {
    input = 'verifyPolicy'

    const action = actions.validateSection(input, true)
    const prevState = {
      state: 'a',
      isValid: false
    }
    const nextState = { ...prevState,
      isValid: true
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle SHOW_ADDITIONAL_FORM_SECTION without section', () => {
    const action = actions.showAdditionalFormSection(input, undefined)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle SHOW_ADDITIONAL_FORM_SECTION with incorrect section', () => {
    input = 'incorrect'

    const action = actions.showAdditionalFormSection(input, undefined)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle SHOW_ADDITIONAL_FORM_SECTION with correct section but no formSection', () => {
    input = 'verifyPolicy'

    const action = actions.showAdditionalFormSection(input, undefined)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle SHOW_ADDITIONAL_FORM_SECTION with correct section sets isShowing for policyUserName', () => {
    input = 'verifyPolicy'

    const action = actions.showAdditionalFormSection(input, 'policyUserName')
    const prevState = { ...initialState,
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          list: [],
          selected: -1
        },
        policyUserName: {
          isShowing: false
        }
      }
    }
    const nextState = { ...prevState,
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          list: [],
          selected: -1
        },
        policyUserName: {
          isShowing: true
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle SHOW_ADDITIONAL_FORM_SECTION with correct section sets isShowing for policyUser', () => {
    input = 'verifyPolicy'

    const action = actions.showAdditionalFormSection(input, 'policyUser')
    const prevState = { ...initialState,
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          list: [],
          selected: -1
        },
        policyUserName: {
          isShowing: false
        }
      }
    }
    const nextState = { ...prevState,
      additionalFormSection: {
        policyUser: {
          isShowing: true,
          list: [],
          selected: -1
        },
        policyUserName: {
          isShowing: false
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle HIDE_ADDITIONAL_FORM_SECTION without section', () => {
    const action = actions.hideAdditionalFormSection(input, undefined)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle HIDE_ADDITIONAL_FORM_SECTION with incorrect section', () => {
    input = 'incorrect'

    const action = actions.hideAdditionalFormSection(input, undefined)
    const prevState = {
      state: 'a'
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle HIDE_ADDITIONAL_FORM_SECTION with correct section with no additionalFormSection', () => {
    input = 'verifyPolicy'

    const action = actions.hideAdditionalFormSection(input, undefined)
    const prevState = { ...initialState
    }
    const nextState = { ...prevState
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })

  it('should handle HIDE_ADDITIONAL_FORM_SECTION with correct section sets isShowing', () => {
    input = 'verifyPolicy'

    const action = actions.hideAdditionalFormSection(input, '')
    const prevState = { ...initialState,
      additionalFormSection: {
        policyUser: {
          isShowing: true
        },
        policyUserName: {
          isShowing: true
        }
      }
    }
    const nextState = { ...prevState,
      additionalFormSection: {
        policyUser: {
          isShowing: false
        },
        policyUserName: {
          isShowing: false
        }
      }
    }

    expect(reducer(prevState, action)).to.deep.equal(nextState)
  })
})
