import Moment from 'moment'
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import RequestPaymentInvoiceDetailsReduxForm, { RequestPaymentInvoiceDetails } from 'routes/RequestPayment/components/InvoiceDetailsForSpecialist'

const spyHandleClick = sinon.spy(RequestPaymentInvoiceDetails.prototype, 'handleClick')
const spyTextChange = sinon.spy(RequestPaymentInvoiceDetails.prototype, 'textChange')

describe('(Component) InvoiceDetailsForSpecialist - mount', () => {
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
      title: 'Invoice details (Specialist)'
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

  it('renders a single NumberDialField', () => {
    expect(wrapper.find('NumberDialField')).to.have.length(1)
  })

  it('triggers handleClick appropriately upon "-" button click', () => {
    expect(spyHandleClick.callCount).to.equal(0)
    wrapper.find('button.is-minus').simulate('click')
    expect(spyHandleClick.callCount).to.equal(1)
  })

  it('triggers handleClick appropriately upon "+" button click', () => {
    expect(spyHandleClick.callCount).to.equal(0)
    wrapper.find('button.is-plus').simulate('click')
    expect(spyHandleClick.callCount).to.equal(1)
  })

  it('text input in NumberDialField triggers textChange', () => {
    expect(spyTextChange.callCount).to.equal(0)
    wrapper.find('input.is-theatre-time').simulate('change', { target: { value: '2' } })
    expect(spyTextChange.callCount).to.equal(1)
  })
})
