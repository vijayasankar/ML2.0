import Moment from 'moment'
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import RequestPaymentInvoiceDetailsReduxForm, { RequestPaymentInvoiceDetails } from 'routes/RequestPayment/components/InvoiceDetailsForHospital'

const spyHandleClick = sinon.spy(RequestPaymentInvoiceDetails.prototype, 'handleClick')
const spyTextChange = sinon.spy(RequestPaymentInvoiceDetails.prototype, 'textChange')

describe('(Component) InvoiceDetailsForHospital - mount', () => {
  let wrapper
  let state
  let props

  beforeEach(() => {
    state = {
      hospitalTime: '',
      theatreTime: ''
    }
    props = {
      change: () => {},
      cssName: 'request-payment__invoice-details',
      title: 'Invoice details (Hospital)'
    }
    wrapper = mount(
      <ReduxFormStub><RequestPaymentInvoiceDetailsReduxForm {...props} {...state} /></ReduxFormStub>
    )
  })

  afterEach(() => {
    spyHandleClick.reset()
    spyTextChange.reset()
  })

  it('renders something', () => {
    expect(wrapper).to.exist
  })

  it('renders a single DateTimePickerField', () => {
    expect(wrapper.find('DateTimePickerField')).to.have.length(1)
  })

  it('renders a single TextField', () => {
    expect(wrapper.find('TextField')).to.have.length(1)
  })

  it('renders two NumberDialField', () => {
    expect(wrapper.find('NumberDialField')).to.have.length(2)
  })

  it('renders two RadioGroupField', () => {
    expect(wrapper.find('RadioGroupField')).to.have.length(2)
  })

  it('clicking "-" button for hospital time triggers handleClick function', () => {
    expect(spyHandleClick.callCount).to.equal(0)
    wrapper.find('button.input-button.is-minus.is-hospital-time').simulate('click')
    expect(spyHandleClick.callCount).to.equal(1)
  })

  it('clicking "+" button for hospital time triggers handleClick function', () => {
    expect(spyHandleClick.callCount).to.equal(0)
    wrapper.find('button.input-button.is-plus.is-hospital-time').simulate('click')
    expect(spyHandleClick.callCount).to.equal(1)
  })

  it('clicking "-" button for theatre time triggers handleClick function', () => {
    expect(spyHandleClick.callCount).to.equal(0)
    wrapper.find('button.input-button.is-minus.is-theatre-time').simulate('click')
    expect(spyHandleClick.callCount).to.equal(1)
  })

  it('clicking "+" button for theatre time triggers handleClick function', () => {
    wrapper.find('button.input-button.is-plus.is-theatre-time').simulate('click')
    expect(spyHandleClick.callCount).to.equal(1)
  })

  it('input values hospital time triggers textChange function', () => {
    expect(spyTextChange.callCount).to.equal(0)
    wrapper.find('input.is-hospital-time').simulate('change', { target: { value: '2' } })
    expect(spyTextChange.callCount).to.equal(1)
  })

  it('input values theatre time triggers textChange function', () => {
    expect(spyTextChange.callCount).to.equal(0)
    wrapper.find('input.is-theatre-time').simulate('change', { target: { value: '2' } })
    expect(spyTextChange.callCount).to.equal(1)
  })
})
