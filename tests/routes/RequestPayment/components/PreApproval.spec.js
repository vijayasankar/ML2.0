import Moment from 'moment'
import React from 'react'
import { SubmissionError } from 'redux-form'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'

import RequestPaymentPreApprovalReduxForm, { RequestPaymentPreApproval, validate } from 'routes/RequestPayment/components/PreApproval'
import * as request from 'utils/request'

const sandbox = sinon.sandbox.create()

describe('(Component) RequestPayment/PreApproval - Redux Form field level validate', () => {
  it('has a field level validatiion which validates DOB must be before today', () => {
    const tomorrow = Moment().add(1, 'days').toString()
    const today = Moment().toString()
    const yesterday = Moment().subtract(1, 'days').toString()

    expect(validate({ dob: yesterday })).to.deep.equal({})
    expect(validate({ dob: today })).to.deep.equal({})
    expect(validate({ dob: tomorrow })).to.deep.equal({
      dob: "Patient's DOB is not valid"
    })
  })
})

describe('(Component) RequestPayment/PreApproval - shallow', () => {
  let wrapper
  let props
  let stub

  const spyChange = sinon.spy()
  const spyHandleSubmit = sinon.spy()
  const spyReset = sinon.spy()
  const spyVerifyPreApprovalSuccess = sinon.spy()
  const spyVerifyPreApproval = sinon.spy(RequestPaymentPreApproval.prototype, 'verifyPreApproval')
  const spyFormSubmit = sinon.spy(RequestPaymentPreApproval.prototype, 'formSubmit')
  const spyInputOnChange = sinon.spy(RequestPaymentPreApproval.prototype, 'inputOnChange')

  beforeEach(() => {
    stub = sandbox.stub(request, 'default')
    props = {
      change: spyChange,
      query: {},
      cssName: 'requestPayment_preApproval',
      dob : '',
      err: {
        preApprovalNumber: {
          isError: undefined,
          message: ''
        },
        dob: {
          isError: undefined,
          message: ''
        }
      },
      handleSubmit: spyHandleSubmit,
      isValid: undefined,
      links: [{
        url: '',
        rel: '',
        method: ''
      }, {
        url: ''
      }],
      name: '',
      preApprovalNumber: '',
      pristine: undefined,
      proposedDateOfProcedure: '',
      reset: spyReset,
      submitting: undefined,
      verifyPreApprovalSuccess: spyVerifyPreApprovalSuccess
    }
    wrapper = shallow(<RequestPaymentPreApproval {...props} />)
  })

  afterEach(() => {
    spyChange.reset()
    spyHandleSubmit.reset()
    spyReset.reset()
    spyVerifyPreApprovalSuccess.reset()
    spyVerifyPreApproval.reset()
    spyFormSubmit.reset()
    spyInputOnChange.reset()
    sandbox.restore()
  })

  it('has text as a state', () => {
    expect(wrapper.state('text')).to.exist
    expect(wrapper.state('text')).to.equal(true)
  })

  it('has date as a state', () => {
    expect(wrapper.state('date')).to.exist
    expect(wrapper.state('date')).to.equal(true)
  })

  it('has formSubmit binded', () => {
    expect(wrapper.instance().formSubmit).to.exist
  })

  it('should render a single textField', () => {
    expect(wrapper.find('TextField')).to.have.length(1)
  })

  it('should render a single DateTimePickerField', () => {
    expect(wrapper.find('DateTimePickerField')).to.have.length(1)
  })

  it('should render two buttons', () => {
    expect(wrapper.find('button')).to.have.length(2)
  })

  it('has componentDidMount which calls prop change if there is a querystring', () => {
    wrapper.instance().componentDidMount()
    expect(spyChange.callCount).to.equal(0)
    wrapper.setProps({ query: {} })
    wrapper.instance().componentDidMount()
    expect(spyChange.callCount).to.equal(0)
    wrapper.setProps({ query: { preApprovalNumber: undefined } })
    wrapper.instance().componentDidMount()
    expect(spyChange.callCount).to.equal(0)
    wrapper.setProps({ query: { preApprovalNumber: 123 } })
    wrapper.instance().componentDidMount()
    expect(spyChange.callCount).to.equal(0)
    wrapper.setProps({ query: { preApprovalNumber: '' } })
    wrapper.instance().componentDidMount()
    expect(spyChange.callCount).to.equal(0)
    wrapper.setProps({ query: { preApprovalNumber: 'aaa' } })
    wrapper.instance().componentDidMount()
    expect(spyChange.callCount).to.equal(1)
    expect(spyChange.calledWith('preApprovalNumber', 'aaa')).to.equal(true)
  })

  it('renders texts instead of input fields when submitted correctly', () => {
    wrapper.setProps({ isValid: true })
    expect(wrapper.find('span.is-policy-number')).to.exist
    expect(wrapper.find('span.is-patient-name')).to.exist
    expect(wrapper.find('span.is-patient-dob')).to.exist
    expect(wrapper.find('span.is-date-preapproval')).to.exist
  })

  it('verifyPreApproval triggers verifyPreApprovalSuccess', (done) => {
    wrapper.setProps({
      links: [{
        rel: 'find-preapp-by-reference-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.resolves({ data: { persons: [1, 2, 3] } })().then((value) => {})
    expect(spyVerifyPreApprovalSuccess.callCount).to.equal(0)
    expect(spyVerifyPreApproval.callCount).to.equal(0)
    wrapper.instance().verifyPreApproval({ policyId: '2', dob: '' }).then((value) => {
      expect(spyVerifyPreApprovalSuccess.callCount).to.equal(1)
    })
    expect(spyVerifyPreApproval.callCount).to.equal(1)
    done()
  })

  it('verifyPreApproval throws an error', (done) => {
    wrapper.setProps({
      links: [{
        rel: 'find-preapp-by-reference-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    stub.rejects({ data: { persons: [1, 2, 3] } })().catch((value) => {})
    expect(spyVerifyPreApproval.callCount).to.equal(0)
    wrapper.instance().verifyPreApproval({ policyId: '2', dob: '' }).catch((value) => {
      expect(wrapper.instance().verifyPreApproval({ policyId: '2', dob: '' })).to.throw()
    })
    expect(spyVerifyPreApproval.callCount).to.equal(1)
    done()
  })

  it('formSubmit triggers verifyPreApproval', () => {
    wrapper.setProps({
      links: [{
        rel: 'find-preapp-by-reference-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    const value = { ...props, dob: '12/12/1212', preApprovalNumber: '12' }
    expect(spyFormSubmit.callCount).to.equal(0)
    expect(spyVerifyPreApproval.callCount).to.equal(0)
    stub.resolves({ data: { persons: [1, 2, 3] } })().then((value) => {})
    wrapper.instance().formSubmit(value)
    expect(spyFormSubmit.callCount).to.equal(1)
    expect(spyVerifyPreApproval.callCount).to.equal(1)
  })

  it('formSubmit throws an error', () => {
    wrapper.setProps({
      links: [{
        rel: 'find-preapp-by-reference-and-dob',
        url: 'http://www.google.com'
      }],
      policyId: '2'
    })
    const value = { ...props, preApprovalNumber: '12' }
    expect(() => wrapper.instance().formSubmit(value)).to.throw(SubmissionError)
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

  it('inputOnChange can be triggered from TextField', () => {
    expect(spyInputOnChange.callCount).to.equal(0)
    wrapper.find('TextField').get(0).props.onChange()
    expect(spyInputOnChange.callCount).to.equal(1)
  })

  it('inputOnChange can be triggered from DateTimePickerField', () => {
    expect(spyInputOnChange.callCount).to.equal(0)
    wrapper.find('DateTimePickerField').get(0).props.onChange()
    expect(spyInputOnChange.callCount).to.equal(1)
  })
})

describe('(Component) RequestPayment/PreApproval - mount', () => {
  let wrapper
  let props
  let state

  beforeEach(() => {
    props = {
      change: () => {},
      query: {},
      cssName: 'requestPayment_preApproval',
      dob : '',
      err: {
        preApprovalNumber: {
          isError: undefined,
          message: ''
        },
        dob: {
          isError: undefined,
          message: ''
        }
      },
      handleSubmit: () => {},
      isValid: undefined,
      links: [],
      name: '',
      preApprovalNumber: '',
      pristine: undefined,
      proposedDateOfProcedure: '',
      reset: () => {},
      submitting: undefined,
      verifyPreApprovalSuccess:() => {}
    }

    state = {}
  })

  it('componentDidMount is triggered successfully upon mount', () => {
    const spyComponentDidMount = sinon.spy(RequestPaymentPreApproval.prototype, 'componentDidMount')
    expect(spyComponentDidMount.callCount).to.equal(0)
    wrapper = mount(
      <ReduxFormStub>
        <RequestPaymentPreApprovalReduxForm {...props} {...state} />
      </ReduxFormStub>
    )
    expect(spyComponentDidMount.callCount).to.equal(1)
  })
})
