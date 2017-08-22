import Moment from 'moment'
import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { SubmissionError } from 'redux-form'

import ReduxFormStub from '../../../ReduxFormStub'
import RequestPreApprovalVerifyPolicyReduxForm, { RequestPreApprovalVerifyPolicy, validate } from 'routes/RequestPreApproval/components/VerifyPolicy'
import * as request from 'utils/request'

const sandbox = sinon.sandbox.create()

const spyHandleShowAdditional = sinon.spy(RequestPreApprovalVerifyPolicy.prototype, 'handleShowAdditional')
const spyHandleHideAdditional = sinon.spy(RequestPreApprovalVerifyPolicy.prototype, 'handleHideAdditional')
const spyVerifyPolicyByPolicyIdAndDob = sinon.spy(RequestPreApprovalVerifyPolicy.prototype, 'verifyPolicyByPolicyIdAndDob')
const spyVerifyPolicyByNameAndDob = sinon.spy(RequestPreApprovalVerifyPolicy.prototype, 'verifyPolicyByNameAndDob')
const spyFormSubmit = sinon.spy(RequestPreApprovalVerifyPolicy.prototype, 'formSubmit')
const spyVerifyPolicySuccess = sinon.spy()
const spyChange = sinon.spy()
const spyHandleSubmit = sinon.spy()
const spyHideAdditionalFormSection = sinon.spy()
const spyReset = sinon.spy()
const spyShowAdditionalFormSection = sinon.spy()
const spyFormReset = sinon.spy()

describe('(Component) RequestPreApproval/VerifyPolicy - Redux Form field level validate', () => {
  const tomorrow = Moment().add(1, 'days').toString()
  const today = Moment().toString()
  const yesterday = Moment().subtract(1, 'days').toString()

  it('has a field level validatiion which validates DOB must be before tomorrow', () => {
    expect(validate({ dob: yesterday })).to.deep.equal({})
    expect(validate({ dob: today })).to.deep.equal({})
    expect(validate({ dob: tomorrow })).to.deep.equal({
      dob: "Patient's DOB is not valid"
    })
  })
})

describe('(Component) RequestPreApproval/VerifyPolicy - shallow', () => {
  let wrapper
  let props
  let stub

  beforeEach(() => {
    stub = sandbox.stub(request, 'default')
    props = {
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          selected: 1,
          list: [{}, {}]
        },
        policyUserName: {
          isShowing: false
        }
      },
      change: spyChange,
      cssName: '',
      dob: '',
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
      firstName: '',
      handleSubmit: spyHandleSubmit,
      hideAdditionalFormSection: spyHideAdditionalFormSection,
      isValid: false,
      lastName: '',
      links: [
        {}
      ],
      policyId: '',
      pristine: true,
      reset: spyReset,
      showAdditionalFormSection: spyShowAdditionalFormSection,
      submitting: false,
      verifyPolicySuccess: spyVerifyPolicySuccess,
      formReset: spyFormReset
    }
    wrapper = shallow(<RequestPreApprovalVerifyPolicy {...props} />)
  })

  afterEach(() => {
    spyHandleShowAdditional.reset()
    spyHandleHideAdditional.reset()
    spyVerifyPolicySuccess.reset()
    spyChange.reset()
    spyHandleSubmit.reset()
    spyHideAdditionalFormSection.reset()
    spyReset.reset()
    spyFormSubmit.reset()
    spyShowAdditionalFormSection.reset()
    spyVerifyPolicySuccess.reset()
    spyVerifyPolicyByNameAndDob.reset()
    spyVerifyPolicyByPolicyIdAndDob.reset()
    spyFormReset.reset()
    sandbox.restore()
  })

  it('successfully shallowed', () => {
    expect(wrapper).to.exist
  })

  it('has date as state', () => {
    expect(wrapper.state('date')).to.exist
    expect(wrapper.state('date')).to.equal(true)
  })

  it('has text as state', () => {
    expect(wrapper.state('text')).to.exist
    expect(wrapper.state('text')).to.equal(true)
  })

  it('has name as state', () => {
    expect(wrapper.state('name')).to.exist
    expect(wrapper.state('name')).to.equal(true)
  })

  it('has handleHideAdditional binded', () => {
    expect(wrapper.instance().handleHideAdditional).to.exist
  })

  it('has handleShowAdditional binded', () => {
    expect(wrapper.instance().handleShowAdditional).to.exist
  })

  it('has formSubmit binded', () => {
    expect(wrapper.instance().formSubmit).to.exist
  })

  it('handleShowAdditional triggers showAdditionalFormSection', () => {
    expect(spyHandleShowAdditional.callCount).to.equal(0)
    expect(spyShowAdditionalFormSection.callCount).to.equal(0)
    wrapper.instance().handleShowAdditional({ preventDefault: () => {} })
    expect(spyHandleShowAdditional.callCount).to.equal(1)
    expect(spyShowAdditionalFormSection.callCount).to.equal(1)
  })

  it('handleShowAdditional triggers formReset', () => {
    expect(spyHandleShowAdditional.callCount).to.equal(0)
    expect(spyFormReset.callCount).to.equal(0)
    wrapper.instance().handleShowAdditional({ preventDefault: () => {} })
    expect(spyFormReset.callCount).to.equal(1)
    expect(spyHandleShowAdditional.callCount).to.equal(1)
  })

  it('handleShowAdditional triggers reset', () => {
    expect(spyHandleShowAdditional.callCount).to.equal(0)
    expect(spyReset.callCount).to.equal(0)
    wrapper.instance().handleShowAdditional({ preventDefault: () => {} })
    expect(spyHandleShowAdditional.callCount).to.equal(1)
    expect(spyReset.callCount).to.equal(1)
  })

  it('handleHideAdditional triggers hideAdditionalFormSection', () => {
    expect(spyHandleHideAdditional.callCount).to.equal(0)
    expect(spyHideAdditionalFormSection.callCount).to.equal(0)
    wrapper.instance().handleHideAdditional({ preventDefault: () => {} })
    expect(spyHandleHideAdditional.callCount).to.equal(1)
    expect(spyHideAdditionalFormSection.callCount).to.equal(1)
  })

  it('handleHideAdditional triggers formReset', () => {
    expect(spyHandleHideAdditional.callCount).to.equal(0)
    expect(spyFormReset.callCount).to.equal(0)
    wrapper.instance().handleHideAdditional({ preventDefault: () => {} })
    expect(spyHandleHideAdditional.callCount).to.equal(1)
    expect(spyFormReset.callCount).to.equal(1)
  })

  it('handleHideAdditional triggers reset', () => {
    expect(spyHandleHideAdditional.callCount).to.equal(0)
    expect(spyReset.callCount).to.equal(0)
    wrapper.instance().handleHideAdditional({ preventDefault: () => {} })
    expect(spyHandleHideAdditional.callCount).to.equal(1)
    expect(spyReset.callCount).to.equal(1)
  })

  it('verifyPolicyByPolicyIdAndDob triggers verifyPolicySuccess', (done) => {
    wrapper.setProps({
      links: [{
        rel: 'find-insured-person-by-policy-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.resolves({ data: { persons: [1, 2, 3] } })().then((value) => {})
    expect(spyVerifyPolicySuccess.callCount).to.equal(0)
    expect(spyVerifyPolicyByPolicyIdAndDob.callCount).to.equal(0)
    wrapper.instance().verifyPolicyByPolicyIdAndDob({ policyId: '2', dob: '' }).then((value) => {
      expect(spyVerifyPolicySuccess.callCount).to.equal(1)
    })
    expect(spyVerifyPolicyByPolicyIdAndDob.callCount).to.equal(1)
    done()
  })

  it('verifyPolicyByPolicyIdAndDob throws error', (done) => {
    wrapper.setProps({
      links: [{
        rel: 'find-insured-person-by-policy-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.rejects({ data: { persons: [1, 2, 3] } })().catch((value) => {})
    expect(spyVerifyPolicyByPolicyIdAndDob.callCount).to.equal(0)
    wrapper.instance().verifyPolicyByPolicyIdAndDob({ policyId: '2', dob: '' }).catch((value) => {
      expect(wrapper.instance().verifyPolicyByPolicyIdAndDob).to.throw()
    })
    expect(spyVerifyPolicyByPolicyIdAndDob.callCount).to.equal(1)
    done()
  })

  it('verifyPolicyByPolicyIdAndDob throws error despite resolving promise', (done) => {
    wrapper.setProps({
      links: [{
        rel: 'find-insured-person-by-policy-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.resolves({ data: { persons: [] } })().then((value) => {})
    expect(spyVerifyPolicyByPolicyIdAndDob.callCount).to.equal(0)
    wrapper.instance().verifyPolicyByPolicyIdAndDob({ policyId: '2', dob: '' }).then((value) => {
      expect(wrapper.instance().verifyPolicyByPolicyIdAndDob({ policyId: '2', dob: '' })).to.throw()
    })
    expect(spyVerifyPolicyByPolicyIdAndDob.callCount).to.equal(1)
    done()
  })

  it('verifyPolicyByNameAndDob triggers apiRequest', (done) => {
    wrapper.setProps({
      links: [{
        rel: 'find-insured-person-by-name-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.resolves({ data: { persons: [1, 2, 3] } })().then((value) => {})
    expect(spyVerifyPolicyByNameAndDob.callCount).to.equal(0)
    expect(spyVerifyPolicySuccess.callCount).to.equal(0)
    wrapper.instance().verifyPolicyByNameAndDob({ policyId: '2', dob: '' }).then((value) => {
      expect(spyVerifyPolicySuccess.callCount).to.equal(1)
    })
    expect(spyVerifyPolicyByNameAndDob.callCount).to.equal(1)
    done()
  })

  it('verifyPolicyByNameAndDob throws error', (done) => {
    wrapper.setProps({
      links: [{
        rel: 'find-insured-person-by-name-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.rejects({ data: { persons: [1, 2, 3] } })().catch((value) => {})
    expect(spyVerifyPolicyByNameAndDob.callCount).to.equal(0)
    wrapper.instance().verifyPolicyByNameAndDob({ policyId: '2', dob: '' }).catch((value) => {
      expect(wrapper.instance().verifyPolicyByNameAndDob).to.throw()
    })
    expect(spyVerifyPolicyByNameAndDob.callCount).to.equal(1)
    done()
  })

  it('verifyPolicyByNameAndDob throws error despite resolving promise', (done) => {
    wrapper.setProps({
      links: [{
        rel: 'find-insured-person-by-name-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.resolves({})().then((value) => {})
    expect(spyVerifyPolicyByNameAndDob.callCount).to.equal(0)
    wrapper.instance().verifyPolicyByNameAndDob({ policyId: '2', dob: '' }).then((value) => {
      expect(wrapper.instance().verifyPolicyByNameAndDob({ policyId: '2', dob: '' })).to.throw()
    })
    expect(spyVerifyPolicyByNameAndDob.callCount).to.equal(1)
    done()
  })

  it('formSubmit triggers verifyPolicyByNameAndDob', () => {
    wrapper.setProps({
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          selected: 1,
          list: [{}, {}]
        },
        policyUserName: {
          isShowing: true
        }
      },
      links: [{
        rel: 'find-insured-person-by-name-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.resolves({ data: { persons: [1, 2, 3] } })().catch((value) => {})
    expect(spyFormSubmit.callCount).to.equal(0)
    expect(spyVerifyPolicyByNameAndDob.callCount).to.equal(0)
    wrapper.instance().formSubmit(props)
    expect(spyFormSubmit.callCount).to.equal(1)
    expect(spyVerifyPolicyByNameAndDob.callCount).to.equal(1)
  })

  it('formSubmit triggers verifyPolicySuccess', () => {
    wrapper.setProps({
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          selected: 1,
          list: [{ name: 'one' }, { name: 'two' }]
        },
        policyUserName: {
          isShowing: false
        }
      }
    })
    const values = { ...props,
      policyUserIndex: '1'
    }
    expect(spyFormSubmit.callCount).to.equal(0)
    expect(spyVerifyPolicySuccess.callCount).to.equal(0)
    wrapper.instance().formSubmit(values)
    expect(spyFormSubmit.callCount).to.equal(1)
    expect(spyVerifyPolicySuccess.callCount).to.equal(1)
  })

  it('formSubmit triggers verifyPolicyByPolicyIdAndDob', () => {
    wrapper.setProps({
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          selected: 1,
          list: [{ name: 'one' }]
        },
        policyUserName: {
          isShowing: false
        }
      },
      links: [{
        rel: 'find-insured-person-by-policy-and-dob',
        url: 'http://www.google.com'
      }]
    })
    const values = { ...props,
      dob: '11/11/2011',
      policyId: '1'
    }
    stub.resolves({ data: { persons: [1, 2, 3] } })().then((value) => {})
    expect(spyFormSubmit.callCount).to.equal(0)
    expect(spyVerifyPolicyByPolicyIdAndDob.callCount).to.equal(0)
    wrapper.instance().formSubmit(values)
    expect(spyFormSubmit.callCount).to.equal(1)
    expect(spyVerifyPolicyByPolicyIdAndDob.callCount).to.equal(1)
  })

  it('formSubmit throws error', () => {
    stub.rejects({ data: { persons: [1, 2, 3] } })().then((value) => {})
    expect(spyFormSubmit.callCount).to.equal(0)
    expect(() => wrapper.instance().formSubmit()).to.throw()
    expect(spyFormSubmit.callCount).to.equal(1)
  })

  it('inputOnChange sets the date state', () => {
    wrapper.instance().inputOnChange({}, '15', 'date')
    expect(wrapper.state('date')).to.equal(false)
  })

  it('inputOnChange sets the date state', () => {
    wrapper.instance().inputOnChange({}, '', 'date')
    expect(wrapper.state('date')).to.equal(true)
  })

  it('inputOnChange sets the text state', () => {
    wrapper.instance().inputOnChange({}, '15', 'text')
    expect(wrapper.state('text')).to.equal(false)
  })

  it('inputOnChange sets the text state', () => {
    wrapper.instance().inputOnChange({}, '', 'text')
    expect(wrapper.state('text')).to.equal(true)
  })

  it('inputOnChange sets the name state', () => {
    wrapper.instance().inputOnChange({}, '15', 'name')
    expect(wrapper.state('name')).to.equal(false)
  })

  it('inputOnChange sets the name state', () => {
    wrapper.instance().inputOnChange({}, '', 'name')
    expect(wrapper.state('name')).to.equal(true)
  })
})

describe('(Component) RequestPreApproval/VerifyPolicy - mount', () => {
  let wrapper
  let props

  const spyHandleSubmit = sinon.spy()

  beforeEach(() => {
    props = {
      additionalFormSection: {
        policyUser: {
          isShowing: false,
          selected: 1,
          list: []
        },
        policyUserName: {
          isShowing: false
        }
      },
      change: spyChange,
      cssName: '',
      dob: '',
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
      firstName: '',
      handleSubmit: () => spyHandleSubmit,
      hideAdditionalFormSection: spyHideAdditionalFormSection,
      isValid: false,
      lastName: '',
      links: [],
      policyId: '',
      pristine: true,
      reset: spyReset,
      showAdditionalFormSection: spyShowAdditionalFormSection,
      submitting: false,
      verifyPolicySuccess: spyVerifyPolicySuccess
    }
    wrapper = mount(
      <ReduxFormStub><RequestPreApprovalVerifyPolicyReduxForm {...props} /></ReduxFormStub>
    )
  })

  afterEach(() => {
    spyChange.reset()
    spyHandleHideAdditional.reset()
    spyHandleShowAdditional.reset()
    spyHandleSubmit.reset()
    spyHandleSubmit.reset()
    spyHideAdditionalFormSection.reset()
    spyReset.reset()
    spyShowAdditionalFormSection.reset()
    spyVerifyPolicyByNameAndDob.reset()
    spyVerifyPolicyByPolicyIdAndDob.reset()
    spyVerifyPolicySuccess.reset()
    spyVerifyPolicySuccess.reset()
  })

  it('successfully mounted', () => {
    expect(wrapper).to.exist
  })

  it('triggers formSubmit when the form is submitted', () => {
    expect(spyHandleSubmit.callCount).to.equal(0)
    wrapper.find('button[type="submit"]').simulate('submit')
    expect(spyHandleSubmit.callCount).to.equal(1)
  })
})
