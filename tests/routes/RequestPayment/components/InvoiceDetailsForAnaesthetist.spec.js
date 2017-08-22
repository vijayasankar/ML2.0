import Moment from 'moment'
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import RequestPaymentInvoiceDetailsReduxForm, { RequestPaymentInvoiceDetails } from 'routes/RequestPayment/components/InvoiceDetailsForAnaesthetist'

const spyHandleClick = sinon.spy(RequestPaymentInvoiceDetails.prototype, 'handleClick')
const spyTextChange = sinon.spy(RequestPaymentInvoiceDetails.prototype, 'textChange')

describe('(Component) InvoiceDetailsForAnaesthetist - mount', () => {
  let wrapper
  let state
  let props

  beforeEach(() => {
    state = {
      theatreTime: ''
    }
    props = {
      change: () => {},
      cssName: 'request-payment__invoice-details',
      title: 'Invoice details (Anaesthetists)'
    }
    wrapper = mount(<ReduxFormStub><RequestPaymentInvoiceDetailsReduxForm {...props} /></ReduxFormStub>)
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
    expect(spyHandleClick.calledWith('-', 15))
    expect(spyHandleClick.callCount).to.equal(1)
  })

  it('triggers handleClick appropriately upon "+" button click', () => {
    expect(spyHandleClick.callCount).to.equal(0)
    wrapper.find('button.is-plus').simulate('click')
    expect(spyHandleClick.calledWith('+', 15))
    expect(spyHandleClick.callCount).to.equal(1)
  })

  it('text input in NumberDialField triggers textChange', () => {
    expect(spyTextChange.callCount).to.equal(0)
    wrapper.find('input.is-theatre-time').simulate('change', { target: { value: '2' } })
    expect(spyTextChange.callCount).to.equal(1)
  })

  it.skip('text input in NumberDialField will change theatreTime', () => {
    wrapper.setState({ theatreTime: '' })
    wrapper.find('input.is-theatre-time').simulate('change', { target: { value: '2' } })
    // TODO: find a way to access the state
    // console.log(wrapper.debug())
    expect(wrapper.state().theatreTime).to.equal('2')
  })
})
